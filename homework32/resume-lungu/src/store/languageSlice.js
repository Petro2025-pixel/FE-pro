import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  // Читаем сохраненный язык или ставим 'en'
  initialState: { 
    lang: localStorage.getItem('appLang') || 'en' 
  }, 
  reducers: {
    toggleLanguage: (state) => {
      state.lang = state.lang === 'en' ? 'ua' : 'en';
      // Сохраняем выбор пользователя
      localStorage.setItem('appLang', state.lang);
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;