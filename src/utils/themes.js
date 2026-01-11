export const themes = {
  ocean: {
    name: 'Ocean',
    colors: {
      '--bg-primary': '#e0f7fa',
      '--bg-secondary': '#b2ebf2',
      '--text-primary': '#006064',
      '--text-secondary': '#00838f',
      '--accent': '#00bcd4',
      '--accent-hover': '#26c6da',
      '--board-bg': 'rgba(255, 255, 255, 0.6)',
      '--cell-bg': 'rgba(255, 255, 255, 0.8)',
      '--cell-hover': 'rgba(255, 255, 255, 1)',
      '--win-line': '#00acc1',
    },
  },
  sunset: {
    name: 'Sunset',
    colors: {
      '--bg-primary': '#fff3e0',
      '--bg-secondary': '#ffe0b2',
      '--text-primary': '#e65100',
      '--text-secondary': '#ef6c00',
      '--accent': '#ff9800',
      '--accent-hover': '#ffa726',
      '--board-bg': 'rgba(255, 255, 255, 0.6)',
      '--cell-bg': 'rgba(255, 255, 255, 0.8)',
      '--cell-hover': 'rgba(255, 255, 255, 1)',
      '--win-line': '#f57c00',
    },
  },
  forest: {
    name: 'Forest',
    colors: {
      '--bg-primary': '#e8f5e9',
      '--bg-secondary': '#c8e6c9',
      '--text-primary': '#1b5e20',
      '--text-secondary': '#2e7d32',
      '--accent': '#4caf50',
      '--accent-hover': '#66bb6a',
      '--board-bg': 'rgba(255, 255, 255, 0.6)',
      '--cell-bg': 'rgba(255, 255, 255, 0.8)',
      '--cell-hover': 'rgba(255, 255, 255, 1)',
      '--win-line': '#43a047',
    },
  },
  midnight: {
    name: 'Midnight',
    colors: {
      '--bg-primary': '#121212',
      '--bg-secondary': '#1e1e1e',
      '--text-primary': '#e0e0e0',
      '--text-secondary': '#b0b0b0',
      '--accent': '#bb86fc',
      '--accent-hover': '#985eff',
      '--board-bg': 'rgba(255, 255, 255, 0.05)',
      '--cell-bg': 'rgba(255, 255, 255, 0.1)',
      '--cell-hover': 'rgba(255, 255, 255, 0.15)',
      '--win-line': '#cf6679',
    },
  },
};

export const applyTheme = (themeName) => {
  const theme = themes[themeName] || themes.ocean;
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};
