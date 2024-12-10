import { Theme } from '@/types/theme';
import { Icons } from '../icons';
import { cn } from '@/lib/utils';

interface ThemeSelectorProps {
  onThemeChange: (theme: Partial<Theme>) => void;
  currentTheme?: Theme['themePreset'];
}

export function ThemeSelector({ onThemeChange, currentTheme }: ThemeSelectorProps) {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "theme-option cursor-pointer p-4 rounded-lg border transition-all",
              currentTheme === template.theme && "border-primary bg-primary/10"
            )}
            onClick={() => onThemeChange({ themePreset: template.theme })}
          >
            <div className="theme-preview relative aspect-video rounded-md overflow-hidden border mb-2">
              {template.preview ? (
                <img 
                  src={template.preview} 
                  alt={template.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-muted">
                  <Icons.image className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
            </div>
            <h3 className="font-medium text-sm">{template.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}