import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from './ThemeContext';
import { Theme } from '@/types/theme';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ColorSettingsProps {
  onThemeChange: (values: Partial<Theme>) => void;
}

export function ColorSettings({ onThemeChange }: ColorSettingsProps) {
  const theme = useTheme();

  const colorInputs = [
    { label: 'Primary Color', key: 'primaryColor' },
    { label: 'Secondary Color', key: 'secondaryColor' },
    { label: 'Accent Color', key: 'accentColor' },
    { label: 'Background Color', key: 'backgroundColor' },
    { label: 'Foreground Color', key: 'foregroundColor' },
    { label: 'Heading Color', key: 'headingColor' },
    { label: 'Text Color', key: 'textColor' },
    { label: 'Link Color', key: 'linkColor' },
    { label: 'Border Color', key: 'borderColor' },
  ] as const;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="colors">
        <AccordionTrigger>Colors</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {colorInputs.map(({ label, key }) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="color"
                    value={theme[key] || '#000000'}
                    onChange={(e) => onThemeChange({ [key]: e.target.value })}
                    className="h-10 p-1 w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}