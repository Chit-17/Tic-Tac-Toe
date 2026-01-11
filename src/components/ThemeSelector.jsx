import React from 'react';
import { themes, applyTheme } from '../utils/themes';

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const handleChange = (themeKey) => {
    applyTheme(themeKey);
    onThemeChange(themeKey);
  };

  return (
    <div style={{ margin: '1rem 0', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
      {Object.entries(themes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => handleChange(key)}
          style={{
            background: key === currentTheme ? 'var(--accent)' : 'var(--bg-secondary)',
            color: key === currentTheme ? 'white' : 'var(--text-primary)',
            border: key === currentTheme ? '2px solid var(--text-primary)' : '1px solid var(--text-secondary)',
            padding: '5px 10px',
            fontSize: '0.9rem',
          }}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
