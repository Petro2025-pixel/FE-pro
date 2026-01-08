import { createContext } from 'react';

export const themes = {
  dark: {
    color: '#ffffff', // Вместо 'white'
    background: '#504d4d',
  },
  light: {
    color: '#000000', // Вместо 'black'
    background: '#fdfbfb',
  }
};

export const ThemeContext = createContext({
  theme: themes.light, 
  setTheme: () => {}, 
});