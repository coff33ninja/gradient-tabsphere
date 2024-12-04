import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Paintbrush, Type } from 'lucide-react';
import { cn } from '@/lib/utils';

const fontOptions = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'opensans', label: 'Open Sans' },
  { value: 'montserrat', label: 'Montserrat' },
];

const fontSizeOptions = [
  { value: 'sm', label: 'Small' },
  { value: 'base', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
];

const themePresets = [
  { value: 'default', label: 'Default' },
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'forest', label: 'Forest' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'sunset', label: 'Sunset' },
];

export function ThemeSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { data: userTheme } = useQuery({
    queryKey: ['user-theme'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data } = await supabase
        .from('user_themes')
        .select('*')
        .eq('user_id', user.id)
        .single();

      return data;
    },
  });

  const updateThemeMutation = useMutation({
    mutationFn: async (values: any) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('user_themes')
        .upsert({
          user_id: user.id,
          ...values,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-theme'] });
      toast({
        title: 'Theme updated',
        description: 'Your theme preferences have been saved.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error updating theme',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleThemeChange = async (values: any) => {
    setIsLoading(true);
    try {
      await updateThemeMutation.mutateAsync(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Theme Settings</h2>
        <p className="text-muted-foreground">
          Customize your application's appearance
        </p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label>Theme Preset</Label>
          <Select
            value={userTheme?.theme_preset || 'default'}
            onValueChange={(value) => handleThemeChange({ theme_preset: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              {themePresets.map((preset) => (
                <SelectItem key={preset.value} value={preset.value}>
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select
            value={userTheme?.font_family || 'inter'}
            onValueChange={(value) => handleThemeChange({ font_family: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Font Size</Label>
          <Select
            value={userTheme?.font_size || 'base'}
            onValueChange={(value) => handleThemeChange({ font_size: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a size" />
            </SelectTrigger>
            <SelectContent>
              {fontSizeOptions.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Colors</Label>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Primary</Label>
              <Input
                type="color"
                value={userTheme?.primary_color || '#000000'}
                onChange={(e) => handleThemeChange({ primary_color: e.target.value })}
                className="h-10 p-1"
              />
            </div>
            <div className="space-y-2">
              <Label>Secondary</Label>
              <Input
                type="color"
                value={userTheme?.secondary_color || '#000000'}
                onChange={(e) => handleThemeChange({ secondary_color: e.target.value })}
                className="h-10 p-1"
              />
            </div>
            <div className="space-y-2">
              <Label>Accent</Label>
              <Input
                type="color"
                value={userTheme?.accent_color || '#000000'}
                onChange={(e) => handleThemeChange({ accent_color: e.target.value })}
                className="h-10 p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}