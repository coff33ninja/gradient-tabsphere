import { Theme } from '@/types/theme';
import { supabase } from '@/integrations/supabase/client';

export const saveThemeLocally = async (theme: Theme) => {
  if (!theme) return;
  
  localStorage.setItem('theme', JSON.stringify(theme));
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('user_themes')
        .upsert({
          user_id: user.id,
          theme_preset: theme.theme_preset,
          primary_color: theme.primaryColor,
          secondary_color: theme.secondaryColor,
          accent_color: theme.accentColor,
          font_family: theme.fontFamily,
          font_size: JSON.stringify(theme.fontSize)
        });
      
      if (error) throw error;
    }
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export const loadLocalTheme = async (): Promise<Theme | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: userTheme } = await supabase
        .from('user_themes')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (userTheme) {
        return {
          primaryColor: userTheme.primary_color || '#646cff',
          secondaryColor: userTheme.secondary_color || '#535bf2',
          accentColor: userTheme.accent_color || '#747bff',
          backgroundColor: '#242424',
          foregroundColor: '#ffffff',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          linkColor: '#646cff',
          borderColor: '#ffffff1a',
          fontFamily: userTheme.font_family || 'system-ui',
          fontSize: userTheme.font_size ? JSON.parse(userTheme.font_size) : {
            base: '1rem',
            heading1: '2rem',
            heading2: '1.5rem',
            heading3: '1.25rem',
            small: '0.875rem'
          },
          spacing: {
            small: '0.5rem',
            medium: '1rem',
            large: '2rem'
          },
          borderRadius: '0.5rem',
          theme_preset: userTheme.theme_preset || 'default'
        };
      }
    }
    
    const localTheme = localStorage.getItem('theme');
    return localTheme ? JSON.parse(localTheme) : null;
  } catch (error) {
    console.error('Error loading theme:', error);
    return null;
  }
};