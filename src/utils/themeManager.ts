export type ThemeColors = {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
};

export const generateThemeCSS = (theme: ThemeColors): string => {
  return `
:root {
  --primary: ${theme.primaryColor};
  --primary-foreground: ${getLightOrDarkText(theme.primaryColor)};
  --secondary: ${theme.secondaryColor};
  --secondary-foreground: ${getLightOrDarkText(theme.secondaryColor)};
  --font-family: ${theme.fontFamily || 'system-ui'};
}

body {
  font-family: var(--font-family);
}`;
};

// Helper to determine if text should be light or dark based on background
const getLightOrDarkText = (backgroundColor: string): string => {
  // Simple luminance calculation
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

export const saveThemeLocally = (theme: ThemeColors) => {
  const css = generateThemeCSS(theme);
  
  // Create a style element if it doesn't exist
  let styleElement = document.getElementById('custom-theme');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'custom-theme';
    document.head.appendChild(styleElement);
  }
  
  // Update the CSS
  styleElement.textContent = css;
  
  // Also save to localStorage for persistence
  localStorage.setItem('custom-theme', JSON.stringify(theme));
};

export const loadLocalTheme = (): ThemeColors | null => {
  const savedTheme = localStorage.getItem('custom-theme');
  if (savedTheme) {
    const theme = JSON.parse(savedTheme);
    saveThemeLocally(theme); // Reapply the theme
    return theme;
  }
  return null;
};