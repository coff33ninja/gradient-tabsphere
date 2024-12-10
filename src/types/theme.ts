export type ThemePreset = 'default' | 'dark' | 'light' | 'forest' | 'ocean' | 'sunset';

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
  headingColor: string;
  textColor: string;
  linkColor: string;
  borderColor: string;
  fontFamily: string;
  fontSize: {
    base: string;
    heading1: string;
    heading2: string;
    heading3: string;
    small: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: string;
  themePreset: ThemePreset;
}