export type ThemePreset = 'default' | 'dark' | 'light' | 'forest' | 'ocean' | 'sunset';

export type FontSize = {
  base: string;
  heading1: string;
  heading2: string;
  heading3: string;
  small: string;
};

export type FontWeight = {
  normal: string;
  medium: string;
  bold: string;
};

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
  fontSize: FontSize;
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: string;
  theme_preset: ThemePreset;
}