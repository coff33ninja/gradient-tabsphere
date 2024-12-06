import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ThemePresets } from './theme/ThemePresets';
import { FontSettings } from './theme/FontSettings';
import { ColorSettings } from './theme/ColorSettings';
import { ThemeProvider } from './theme/ThemeContext';
import { Theme, ThemePreset } from '@/types/theme';

export function ThemeSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { data: userThemeData } = useQuery({
    queryKey: ['user-theme'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_themes')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const userTheme: Theme = {
    primaryColor: userThemeData?.primary_color || '',
    secondaryColor: userThemeData?.secondary_color || '',
    fontFamily: userThemeData?.font_family || '',
    themePreset: (userThemeData?.theme_preset as ThemePreset) || 'default',
  };

  const updateThemeMutation = useMutation({
    mutationFn: async (values: Partial<Theme>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('user_themes')
        .upsert({
          user_id: user.id,
          ...values,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-theme'] });
      toast({
        title: 'Theme updated',
        description: 'Your theme preferences have been saved.',
      });
    },
    onError: (error) => {
      console.error('Theme update error:', error);
      toast({
        title: 'Error updating theme',
        description: 'Failed to update theme preferences.',
        variant: 'destructive',
      });
    },
  });

  const handleThemeChange = async (values: Partial<Theme>) => {
    setIsLoading(true);
    try {
      await updateThemeMutation.mutateAsync(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider value={userTheme}>
      <div className="space-y-6 p-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Theme Settings</h2>
          <p className="text-muted-foreground">
            Customize your application's appearance
          </p>
        </div>

        <div className="grid gap-4">
          <ThemePresets onThemeChange={handleThemeChange} />
          <FontSettings onThemeChange={handleThemeChange} />
          <ColorSettings onThemeChange={handleThemeChange} />
        </div>
      </div>
    </ThemeProvider>
  );
}