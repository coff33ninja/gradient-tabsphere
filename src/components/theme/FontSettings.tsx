import { Label } from '@/components/ui/label';
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

const fontSizeOptions = [
  { value: 'sm', label: 'Small' },
  { value: 'base', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
];

interface FontSettingsProps {
  userTheme: any;
  handleThemeChange: (values: any) => void;
}

export function FontSettings({ userTheme, handleThemeChange }: FontSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Font Family</Label>
        <Select
          value={userTheme?.font_family || 'inter'}
          onValueChange={(value) => handleThemeChange({ font_family: value })}
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

      <div className="space-y-2">
        <Label>Font Size</Label>
        <Select
          value={userTheme?.font_size || 'base'}
          onValueChange={(value) => handleThemeChange({ font_size: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a size" />
          </SelectTrigger>
          <SelectContent>
            {fontSizeOptions.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}