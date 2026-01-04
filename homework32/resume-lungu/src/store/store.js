import { configureStore, combineReducers } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import languageReducer from './languageSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  language: languageReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});