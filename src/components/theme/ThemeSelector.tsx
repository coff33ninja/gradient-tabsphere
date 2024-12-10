import { useState } from 'react';
import { useTheme } from './ThemeContext';
import { Theme } from '@/types/theme';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    preview: '/templates/modern.png',
    theme: 'default' as Theme['themePreset']
  },
  {
    id: 'dashboard-ui-1',
    name: 'Dashboard UI 1',
    preview: '/templates/dashboard1.png',
    theme: 'dark' as Theme['themePreset']
  },
  {
    id: 'responsive-dashboard',
    name: 'Responsive Dashboard',
    preview: '/templates/responsive.png',
    theme: 'light' as Theme['themePreset']
  }
];

export function ThemeSelector() {
  const { userTheme, handleThemeChange } = useTheme();
  const [activeTemplate, setActiveTemplate] = useState(templates[0].id);

  const handleTemplateChange = (template: typeof templates[0]) => {
    setActiveTemplate(template.id);
    handleThemeChange({ themePreset: template.theme });
  };

  return (
    <div className="theme-selector">
      <h3 className="text-lg font-semibold mb-4">Template Style</h3>
      <div className="space-y-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "theme-option",
              activeTemplate === template.id && "active"
            )}
            onClick={() => handleTemplateChange(template)}
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