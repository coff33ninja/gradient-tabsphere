import { Label } from '@/components/ui/label';
import { useTheme } from './ThemeContext';
import { Theme, FontSize, FontWeight } from '@/types/theme';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const fontOptions = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'opensans', label: 'Open Sans' },
  { value: 'montserrat', label: 'Montserrat' },
  { value: 'system-ui', label: 'System Default' },
];

const fontSizes = {
  small: '0.875rem',
  base: '1rem',
  large: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
};

interface FontSettingsProps {
  onThemeChange: (values: Partial<Theme>) => void;
}

export function FontSettings({ onThemeChange }: FontSettingsProps) {
  const theme = useTheme();

  const handleFontSizeChange = (size: string, type: keyof Theme['fontSize']) => {
    onThemeChange({
      fontSize: {
        ...theme.fontSize,
        [type]: size,
      },
    });
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="typography">
        <AccordionTrigger>Typography</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Font Family</Label>
              <Select
                value={theme.fontFamily || 'system-ui'}
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

            <div className="space-y-4">
              <Label>Font Sizes</Label>
              {Object.entries(theme.fontSize || {}).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-4 items-center">
                  <Label>{key}</Label>
                  <Select
                    value={value}
                    onValueChange={(size) => handleFontSizeChange(size, key as keyof Theme['fontSize'])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(fontSizes).map(([sizeKey, sizeValue]) => (
                        <SelectItem key={sizeKey} value={sizeValue}>
                          {sizeKey} ({sizeValue})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}