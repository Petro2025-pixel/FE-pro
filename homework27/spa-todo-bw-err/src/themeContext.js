import { createContext } from 'react';

export const themes = {
  dark: {
    color: 'white',
    background: '#504d4dff',
  },
  light: {
    color: 'black',
    background: '#fdfbfbff',
  }
};

export const ThemeContext = createContext({
  theme: themes.light, 
  setTheme: () => {}, 
});