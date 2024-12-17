import { Label } from '@/components/ui/label';
import { useTheme } from './ThemeContext';
import { Theme } from '@/types/theme';
import { applyTheme } from '@/themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const themePresets = [
  { value: 'default' as const, label: 'Default' },
  { value: 'dark' as const, label: 'Dark' },
  { value: 'light' as const, label: 'Light' },
  { value: 'forest' as const, label: 'Forest' },
  { value: 'ocean' as const, label: 'Ocean' },
  { value: 'sunset' as const, label: 'Sunset' },
];

interface ThemePresetsProps {
  onThemeChange: (values: Partial<Theme>) => void;
}

export function ThemePresets({ onThemeChange }: ThemePresetsProps) {
  const theme = useTheme();

  const handleThemeChange = (value: Theme['theme_preset']) => {
    applyTheme(value);
    onThemeChange({ theme_preset: value });
  };

  return (
    <div className="space-y-2">
      <Label>Theme Preset</Label>
      <Select
        value={theme.theme_preset || 'default'}
        onValueChange={handleThemeChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          {themePresets.map((preset) => (
            <SelectItem 
              key={preset.value} 
              value={preset.value}
              className="cursor-pointer"
            >
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}