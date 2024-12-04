import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const themePresets = [
  { value: 'default', label: 'Default' },
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'forest', label: 'Forest' },
  { value: 'ocean', label: 'Ocean' },
  { value: 'sunset', label: 'Sunset' },
];

interface Theme {
  theme_preset: string;
}

interface ThemePresetsProps {
  userTheme: Theme; // Specify the type for userTheme
  handleThemeChange: (values: { theme_preset: string }) => void; // Updated type
}

export function ThemePresets({ userTheme, handleThemeChange }: ThemePresetsProps) {
  return (
    <div className="space-y-2">
      <Label>Theme Preset</Label>
      <Select
        value={userTheme?.theme_preset || 'default'}
        onValueChange={(value) => handleThemeChange({ theme_preset: value })}
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