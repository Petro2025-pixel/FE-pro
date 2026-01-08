import React, { useContext } from 'react';
import { ThemeContext, themes } from '../../themeContext';

const Switch = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme.background === themes.dark.background;

  const handleChangeClick = () => {
    const nextTheme = isDark ? themes.light : themes.dark;
    setTheme(nextTheme);
  };

  return (
    <label className="switch">
      <span className="switch__label">Dark Mode</span> 
      <input
        type="checkbox"
        aria-label="Dark Mode" 
        onChange={handleChangeClick} 
        checked={isDark} 
      />
      <span className="slider round" />
    </label>
  );
};

export default Switch;