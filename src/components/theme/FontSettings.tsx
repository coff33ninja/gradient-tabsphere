import { Label } from '@/components/ui/label';
import { useTheme } from './ThemeContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const fontOptions = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'opensans', label: 'Open Sans' },
  { value: 'montserrat', label: 'Montserrat' },
];

interface FontSettingsProps {
  onThemeChange: (values: Partial<Theme>) => void;
}

export function FontSettings({ onThemeChange }: FontSettingsProps) {
  const theme = useTheme();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Font Family</Label>
        <Select
          value={theme.fontFamily || 'inter'}
          onValueChange={(value) => onThemeChange({ fontFamily: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}