import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorSettingsProps {
  userTheme: any;
  handleThemeChange: (values: any) => void;
}

export function ColorSettings({ userTheme, handleThemeChange }: ColorSettingsProps) {
  return (
    <div className="space-y-2">
      <Label>Colors</Label>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Primary</Label>
          <Input
            type="color"
            value={userTheme?.primary_color || '#000000'}
            onChange={(e) => handleThemeChange({ primary_color: e.target.value })}
            className="h-10 p-1"
          />
        </div>
        <div className="space-y-2">
          <Label>Secondary</Label>
          <Input
            type="color"
            value={userTheme?.secondary_color || '#000000'}
            onChange={(e) => handleThemeChange({ secondary_color: e.target.value })}
            className="h-10 p-1"
          />
        </div>
        <div className="space-y-2">
          <Label>Accent</Label>
          <Input
            type="color"
            value={userTheme?.accent_color || '#000000'}
            onChange={(e) => handleThemeChange({ accent_color: e.target.value })}
            className="h-10 p-1"
          />
        </div>
      </div>
    </div>
  );
}