import { Theme } from '@/types/theme';
import { Icons } from '../icons';

interface ThemeSelectorProps {
  onThemeChange: (theme: Partial<Theme>) => void;
}

export function ThemeSelector({ onThemeChange }: ThemeSelectorProps) {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      preview: '/templates/modern.png',
      theme: 'default' as const
    },
    {
      id: 'dashboard-ui-1',
      name: 'Dashboard UI 1',
      preview: '/templates/dashboard1.png',
      theme: 'dark' as const
    },
    {
      id: 'responsive-dashboard',
      name: 'Responsive Dashboard',
      preview: '/templates/responsive.png',
      theme: 'light' as const
    }
  ];

  return (
    <div className="theme-selector">
      <h3 className="text-lg font-semibold mb-4">Template Style</h3>
      <div className="space-y-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className="theme-option"
            onClick={() => onThemeChange({ themePreset: template.theme })}
          >
            <div className="theme-preview">
              {template.preview ? (
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                  <Icons.image className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <h4 className="font-medium">{template.name}</h4>
              <p className="text-sm text-muted-foreground">
                {template.theme} theme
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}