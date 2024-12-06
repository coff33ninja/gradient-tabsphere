import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ThemePreset = "default" | "dark" | "light" | "forest" | "ocean" | "sunset";

const themePresets = [
  { value: 'default' as ThemePreset, label: 'Default' },
  { value: 'dark' as ThemePreset, label: 'Dark' },
  { value: 'light' as ThemePreset, label: 'Light' },
  { value: 'forest' as ThemePreset, label: 'Forest' },
  { value: 'ocean' as ThemePreset, label: 'Ocean' },
  { value: 'sunset' as ThemePreset, label: 'Sunset' },
];

interface Theme {
  theme_preset: ThemePreset;
}

interface ThemePresetsProps {
  userTheme: Theme;
  handleThemeChange: (values: { theme_preset: ThemePreset }) => void;
}

export function ThemePresets({ userTheme, handleThemeChange }: ThemePresetsProps) {
  return (
    <div className="space-y-2">
      <Label>Theme Preset</Label>
      <Select
        value={userTheme?.theme_preset || 'default'}
        onValueChange={(value: ThemePreset) => handleThemeChange({ theme_preset: value })}
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