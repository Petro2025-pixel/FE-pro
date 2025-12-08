import React, { useContext } from 'react';
import { ThemeContext, themes } from '../../themeContext'; 

const ChangeButtonColor = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChangeClick = () => {
  const newTheme = theme.color === 'white' 
                     ? themes.light 
                     : themes.dark;
       setTheme(newTheme);
  };
  return (
    <button onClick={handleChangeClick} className="btn btn-warning mr-2">Change Style</button>

  );
};

export default ChangeButtonColor;