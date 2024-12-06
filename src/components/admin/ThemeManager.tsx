import { ThemeSettings } from '../ThemeSettings';

export const ThemeManager = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Theme Management</h2>
      <ThemeSettings />
    </div>
  );
};