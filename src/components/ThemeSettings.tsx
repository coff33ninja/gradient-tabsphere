import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ThemePresets } from './theme/ThemePresets';
import { FontSettings } from './theme/FontSettings';
import { ColorSettings } from './theme/ColorSettings';
import { ThemeProvider } from './theme/ThemeContext';
import { Theme, ThemePreset } from '@/types/theme';
import { saveThemeLocally, loadLocalTheme } from '@/utils/themeManager';

export function ThemeSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userTheme, setUserTheme] = useState<Theme>({
    primaryColor: '',
    secondaryColor: '',
    fontFamily: '',
    themePreset: 'default' as ThemePreset,
  });

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
      
      // Save theme locally
      saveThemeLocally({
        primaryColor: newTheme.primaryColor,
        secondaryColor: newTheme.secondaryColor,
        fontFamily: newTheme.fontFamily,
      });
      
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