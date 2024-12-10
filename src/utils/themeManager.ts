import { Theme } from '@/types/theme';

// Helper to determine if text should be light or dark based on background
const getLightOrDarkText = (backgroundColor: string = '#242424'): string => {
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
  // Ensure we have default values for all theme properties
  const safeTheme = {
    primaryColor: theme.primaryColor || '#646cff',
    secondaryColor: theme.secondaryColor || '#535bf2',
    accentColor: theme.accentColor || '#747bff',
    backgroundColor: theme.backgroundColor || '#242424',
    foregroundColor: theme.foregroundColor || '#ffffff',
    headingColor: theme.headingColor || '#ffffff',
    textColor: theme.textColor || '#ffffff',
    linkColor: theme.linkColor || '#646cff',
    borderColor: theme.borderColor || '#ffffff1a',
    fontFamily: theme.fontFamily || 'system-ui',
    fontSize: {
      base: theme.fontSize?.base || '1rem',
      heading1: theme.fontSize?.heading1 || '2rem',
      heading2: theme.fontSize?.heading2 || '1.5rem',
      heading3: theme.fontSize?.heading3 || '1.25rem',
      small: theme.fontSize?.small || '0.875rem'
    },
    spacing: {
      small: theme.spacing?.small || '0.5rem',
      medium: theme.spacing?.medium || '1rem',
      large: theme.spacing?.large || '2rem'
    },
    borderRadius: theme.borderRadius || '0.5rem',
    themePreset: theme.themePreset || 'default'
  };

  // Automatically determine text colors based on background
  const textColor = getLightOrDarkText(safeTheme.backgroundColor);
  
  return `
:root {
  --primary: ${safeTheme.primaryColor};
  --primary-foreground: ${getLightOrDarkText(safeTheme.primaryColor)};
  --secondary: ${safeTheme.secondaryColor};
  --secondary-foreground: ${getLightOrDarkText(safeTheme.secondaryColor)};
  --accent: ${safeTheme.accentColor};
  --background: ${safeTheme.backgroundColor};
  --foreground: ${textColor};
  --heading: ${textColor};
  --text: ${textColor};
  --link: ${safeTheme.linkColor};
  --border: ${safeTheme.borderColor};
  --font-family: ${safeTheme.fontFamily};
  --font-size-base: ${safeTheme.fontSize.base};
  --font-size-h1: ${safeTheme.fontSize.heading1};
  --font-size-h2: ${safeTheme.fontSize.heading2};
  --font-size-h3: ${safeTheme.fontSize.heading3};
  --font-size-small: ${safeTheme.fontSize.small};
  --spacing-small: ${safeTheme.spacing.small};
  --spacing-medium: ${safeTheme.spacing.medium};
  --spacing-large: ${safeTheme.spacing.large};
  --border-radius: ${safeTheme.borderRadius};
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
  if (!theme) return;
  
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
  try {
    const savedTheme = localStorage.getItem('custom-theme');
    if (savedTheme) {
      const theme = JSON.parse(savedTheme);
      saveThemeLocally(theme); // Reapply the theme
      return theme;
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
  return null;
};