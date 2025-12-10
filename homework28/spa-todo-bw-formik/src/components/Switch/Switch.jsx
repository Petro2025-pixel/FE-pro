import React, { useContext } from 'react';
import { ThemeContext, themes } from '../../themeContext';

const Switch = () => {
  
  const { theme, setTheme } = useContext(ThemeContext);
  
  const handleChangeClick = () => {
    const newTheme = theme.color === themes.light.color 
                       ? themes.dark 
                       : themes.light;
    setTheme(newTheme);
  };
  
  const isChecked = theme.color === themes.dark.color;


  return (
    <label className="switch">
      <span className="switch__label">Dark Mode</span> 
      <div className="slider-container"> 
        <input
          type="checkbox"
          onChange={handleChangeClick} 
          checked={isChecked} 
        />
        <span className="slider round" />
      </div>
    </label>
  );
};

export default Switch;