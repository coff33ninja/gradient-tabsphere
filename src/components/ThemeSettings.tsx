import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ThemePresets } from './theme/ThemePresets';
import { FontSettings } from './theme/FontSettings';
import { ColorSettings } from './theme/ColorSettings';

// Define the ThemeValues interface
interface ThemeValues {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

// Define the Theme interface
interface Theme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  theme_preset: string;
}

export function ThemeSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { data: userThemeData, isError } = useQuery({
    queryKey: ['user-theme'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_themes')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      
      // If no theme exists, create a default one
      if (!data || data.length === 0) {
        const defaultTheme = {
          user_id: user.id,
          primary_color: '#000000',
          secondary_color: '#000000',
          font_family: 'inter',
          theme_preset: 'default',
        };

        const { data: newTheme, error: insertError } = await supabase
          .from('user_themes')
          .insert(defaultTheme)
          .select()
          .single();

        if (insertError) throw insertError;
        return newTheme;
      }

      // Return the first theme if multiple exist (shouldn't happen due to RLS)
      return data[0];
    },
  });

  const userTheme: Theme = userThemeData ? {
    primaryColor: userThemeData.primary_color || '',
    secondaryColor: userThemeData.secondary_color || '',
    fontFamily: userThemeData.font_family || '',
    theme_preset: userThemeData.theme_preset || 'default',
  } : {
    primaryColor: '',
    secondaryColor: '',
    fontFamily: '',
    theme_preset: 'default',
  };

  const updateThemeMutation = useMutation({
    mutationFn: async (values: ThemeValues) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('user_themes')
        .upsert({
          user_id: user.id,
          primary_color: values.primaryColor,
          secondary_color: values.secondaryColor,
          font_family: values.fontFamily,
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
      console.error('Theme update error:', error);
      toast({
        title: 'Error updating theme',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleThemeChange = async (values: { theme_preset: string }) => {
    const themeValues: ThemeValues = {
      primaryColor: userTheme.primaryColor,
      secondaryColor: userTheme.secondaryColor,
      fontFamily: userTheme.fontFamily,
    };

    setIsLoading(true);
    try {
      await updateThemeMutation.mutateAsync(themeValues);
    } finally {
      setIsLoading(false);
    }
  };

  if (isError) {
    toast({
      title: 'Error loading theme',
      description: 'Failed to load your theme preferences.',
      variant: 'destructive',
    });
  }

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