import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  
  initialState: { 
    lang: localStorage.getItem('appLang') || 'en' 
  }, 
  reducers: {
    toggleLanguage: (state) => {
      state.lang = state.lang === 'en' ? 'ua' : 'en';
      localStorage.setItem('appLang', state.lang);
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;