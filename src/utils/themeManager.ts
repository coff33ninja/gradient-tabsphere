import { Theme } from '@/types/theme';

// Helper to determine if text should be light or dark based on background
const getLightOrDarkText = (backgroundColor: string): string => {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark backgrounds, dark gray for light backgrounds
  return luminance > 0.5 ? '#1a1a1a' : '#ffffff';
};

export const generateThemeCSS = (theme: Theme): string => {
  // Automatically determine text colors based on background
  const textColor = getLightOrDarkText(theme.backgroundColor);
  
  return `
:root {
  --primary: ${theme.primaryColor};
  --primary-foreground: ${getLightOrDarkText(theme.primaryColor)};
  --secondary: ${theme.secondaryColor};
  --secondary-foreground: ${getLightOrDarkText(theme.secondaryColor)};
  --accent: ${theme.accentColor};
  --background: ${theme.backgroundColor};
  --foreground: ${textColor};
  --heading: ${textColor};
  --text: ${textColor};
  --link: ${theme.linkColor};
  --border: ${theme.borderColor};
  --font-family: ${theme.fontFamily || 'system-ui'};
  --font-size-base: ${theme.fontSize?.base || '1rem'};
  --font-size-h1: ${theme.fontSize?.heading1 || '2rem'};
  --font-size-h2: ${theme.fontSize?.heading2 || '1.5rem'};
  --font-size-h3: ${theme.fontSize?.heading3 || '1.25rem'};
  --font-size-small: ${theme.fontSize?.small || '0.875rem'};
  --spacing-small: ${theme.spacing?.small || '0.5rem'};
  --spacing-medium: ${theme.spacing?.medium || '1rem'};
  --spacing-large: ${theme.spacing?.large || '2rem'};
  --border-radius: ${theme.borderRadius || '0.5rem'};
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: var(--text);
  background: var(--background);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--heading);
}

h1 { font-size: var(--font-size-h1); }
h2 { font-size: var(--font-size-h2); }
h3 { font-size: var(--font-size-h3); }

a {
  color: var(--link);
}

.text-small {
  font-size: var(--font-size-small);
}`;
};

export const saveThemeLocally = (theme: Theme) => {
  const css = generateThemeCSS(theme);
  
  // Create or update style element
  let styleElement = document.getElementById('custom-theme');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'custom-theme';
    document.head.appendChild(styleElement);
  }
  
  styleElement.textContent = css;
  
  // Save to localStorage
  localStorage.setItem('custom-theme', JSON.stringify(theme));
};

export const loadLocalTheme = (): Theme | null => {
  const savedTheme = localStorage.getItem('custom-theme');
  if (savedTheme) {
    const theme = JSON.parse(savedTheme);
    saveThemeLocally(theme); // Reapply the theme
    return theme;
  }
  return null;
};