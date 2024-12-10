export type ThemePreset = "default" | "dark" | "light" | "forest" | "ocean" | "sunset";

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  themePreset: ThemePreset;
}