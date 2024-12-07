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

  const { data: userThemeData, error: themeError } = useQuery({
    queryKey: ['user-theme'],
    queryFn: async () => {
      console.log('Fetching user theme data');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No user found');
        return null;
      }

      const { data, error } = await supabase
        .from('user_themes')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching theme:', error);
        throw error;
      }
      console.log('Theme data fetched:', data);
      return data;
    },
  });

  // If there's an error fetching the theme, show a toast
  if (themeError) {
    console.error('Theme fetch error:', themeError);
    toast({
      title: 'Error loading theme',
      description: 'Your theme preferences could not be loaded. Using default theme.',
      variant: 'destructive',
    });
  }

  const userTheme: Theme = {
    primaryColor: userThemeData?.primary_color || '',
    secondaryColor: userThemeData?.secondary_color || '',
    fontFamily: userThemeData?.font_family || '',
    themePreset: (userThemeData?.theme_preset as ThemePreset) || 'default',
  };

  const updateThemeMutation = useMutation({
    mutationFn: async (values: Partial<Theme>) => {
      console.log('Updating theme with values:', values);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No user found during update');
        throw new Error('No user found');
      }

      // Map the Theme interface values to database column names
      const dbValues = {
        primary_color: values.primaryColor,
        secondary_color: values.secondaryColor,
        font_family: values.fontFamily,
        theme_preset: values.themePreset,
      };

      console.log('Mapped DB values:', { user_id: user.id, ...dbValues });

      // First check if a theme exists for this user
      const { data: existingTheme } = await supabase
        .from('user_themes')
        .select('id')
        .eq('user_id', user.id)
        .single();

      let error;
      if (existingTheme) {
        // Update existing theme
        const { error: updateError } = await supabase
          .from('user_themes')
          .update({
            ...dbValues,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id);
        error = updateError;
      } else {
        // Insert new theme
        const { error: insertError } = await supabase
          .from('user_themes')
          .insert({
            user_id: user.id,
            ...dbValues,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        error = insertError;
      }

      if (error) {
        console.error('Theme update error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Theme updated successfully');
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
        description: 'Failed to update theme preferences. Please try again.',
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