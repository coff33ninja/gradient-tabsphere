import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ThemePresets } from './theme/ThemePresets';
import { FontSettings } from './theme/FontSettings';
import { ColorSettings } from './theme/ColorSettings';

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
        <ThemePresets userTheme={userTheme} handleThemeChange={handleThemeChange} />
        <FontSettings userTheme={userTheme} handleThemeChange={handleThemeChange} />
        <ColorSettings userTheme={userTheme} handleThemeChange={handleThemeChange} />
      </div>
    </div>
  );
}