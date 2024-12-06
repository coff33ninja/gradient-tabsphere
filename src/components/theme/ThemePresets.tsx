import { Label } from '@/components/ui/label';
import { useTheme } from './ThemeContext';
import { Theme, ThemePreset } from '@/types/theme';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const themePresets = [
  { value: 'default' as ThemePreset, label: 'Default' },
  { value: 'dark' as ThemePreset, label: 'Dark' },
  { value: 'light' as ThemePreset, label: 'Light' },
  { value: 'forest' as ThemePreset, label: 'Forest' },
  { value: 'ocean' as ThemePreset, label: 'Ocean' },
  { value: 'sunset' as ThemePreset, label: 'Sunset' },
];

interface ThemePresetsProps {
  onThemeChange: (values: Partial<Theme>) => void;
}

export function ThemePresets({ onThemeChange }: ThemePresetsProps) {
  const theme = useTheme();

  return (
    <div className="space-y-2">
      <Label>Theme Preset</Label>
      <Select
        value={theme.themePreset || 'default'}
        onValueChange={(value: ThemePreset) => onThemeChange({ themePreset: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          {themePresets.map((preset) => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}