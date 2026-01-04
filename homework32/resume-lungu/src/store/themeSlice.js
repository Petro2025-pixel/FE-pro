import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  // Читаем сохраненную тему или ставим 'light' по умолчанию
  initialState: {
    mode: localStorage.getItem('themeMode') || 'light', 
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      // Сохраняем выбор пользователя
      localStorage.setItem('themeMode', state.mode); 
    },
    setThemeMode: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('themeMode', action.payload);
    },
  },
});

export const { toggleTheme, setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;