export type ThemeColors = {
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
};

export const generateThemeCSS = (theme: ThemeColors): string => {
  return `
:root {
  --primary: ${theme.primaryColor};
  --primary-foreground: ${getLightOrDarkText(theme.primaryColor)};
  --secondary: ${theme.secondaryColor};
  --secondary-foreground: ${getLightOrDarkText(theme.secondaryColor)};
  --accent: ${theme.accentColor};
  --background: ${theme.backgroundColor};
  --foreground: ${theme.foregroundColor};
  --heading: ${theme.headingColor};
  --text: ${theme.textColor};
  --link: ${theme.linkColor};
  --border: ${theme.borderColor};
  --font-family: ${theme.fontFamily || 'system-ui'};
  --font-size-base: ${theme.fontSize?.base || '1rem'};
  --font-size-h1: ${theme.fontSize?.heading1 || '2rem'};
  --font-size-h2: ${theme.fontSize?.heading2 || '1.5rem'};
  --font-size-h3: ${theme.fontSize?.heading3 || '1.25rem'};
  --font-size-small: ${theme.fontSize?.small || '0.875rem'};
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