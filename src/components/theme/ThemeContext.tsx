import { createContext, useContext, ReactNode } from 'react';

type ThemePreset = "default" | "dark" | "light" | "forest" | "ocean" | "sunset";

interface ThemeContextType {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  themePreset: ThemePreset;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  value: ThemeContextType;
}

export const ThemeProvider = ({ children, value }: ThemeProviderProps) => (
  <ThemeContext.Provider value={value}>
    {children}
  </ThemeContext.Provider>
);