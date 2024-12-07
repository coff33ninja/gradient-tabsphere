import { defaultTheme } from './default';
import { darkTheme } from './dark';
import { lightTheme } from './light';
import { forestTheme } from './forest';
import { oceanTheme } from './ocean';
import { sunsetTheme } from './sunset';
import { Theme } from '@/types/theme';

export const themes: Record<Theme['themePreset'], Record<string, string>> = {
  default: defaultTheme,
  dark: darkTheme,
  light: lightTheme,
  forest: forestTheme,
  ocean: oceanTheme,
  sunset: sunsetTheme,
};

export const applyTheme = (themeName: Theme['themePreset']) => {
  const theme = themes[themeName];
  if (!theme) return;

  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(`--${cssVar}`, value);
  });

  // Save the theme preference to localStorage
  localStorage.setItem('theme-preset', themeName);
};

// Initialize theme from localStorage or default
export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme-preset') as Theme['themePreset'] || 'default';
  applyTheme(savedTheme);
  return savedTheme;
};