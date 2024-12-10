import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ThemePresets } from './theme/ThemePresets';
import { FontSettings } from './theme/FontSettings';
import { ColorSettings } from './theme/ColorSettings';
import { ThemeProvider } from './theme/ThemeContext';
import { Theme, ThemePreset } from '@/types/theme';
import { saveThemeLocally, loadLocalTheme } from '@/utils/themeManager';
import { TooltipProvider } from '@/components/ui/tooltip';

const defaultTheme: Theme = {
  primaryColor: '#646cff',
  secondaryColor: '#535bf2',
  accentColor: '#747bff',
  backgroundColor: '#242424',
  foregroundColor: '#ffffff',
  headingColor: '#ffffff',
  textColor: '#ffffff',
  linkColor: '#646cff',
  borderColor: '#ffffff1a',
  fontFamily: 'system-ui',
  fontSize: {
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
  themePreset: 'default' as ThemePreset,
};

export function ThemeSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userTheme, setUserTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // Load theme from localStorage on component mount
    const savedTheme = loadLocalTheme();
    if (savedTheme) {
      setUserTheme(prev => ({
        ...prev,
        ...savedTheme
      }));
    }
  }, []);

  const handleThemeChange = async (values: Partial<Theme>) => {
    setIsLoading(true);
    try {
      const newTheme = {
        ...userTheme,
        ...values
      };
      
      saveThemeLocally(newTheme);
      setUserTheme(newTheme);
      
      toast({
        title: 'Theme updated',
        description: 'Your theme preferences have been saved.',
      });
    } catch (error) {
      console.error('Theme update error:', error);
      toast({
        title: 'Error updating theme',
        description: 'Failed to update theme preferences. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
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
    </TooltipProvider>
  );
}