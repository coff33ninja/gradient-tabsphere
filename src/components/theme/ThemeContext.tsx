import { createContext, useContext, ReactNode } from 'react';
import { Theme, ThemePreset } from '@/types/theme';

const ThemeContext = createContext<Theme | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  value: Theme;
}

export const ThemeProvider = ({ children, value }: ThemeProviderProps) => (
  <ThemeContext.Provider value={value}>
    {children}
  </ThemeContext.Provider>
);