import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: state => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
      localStorage.setItem('token', action.payload);
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.token = null;
    },

    logout: state => {
      state.token = null;
      state.loading = false;
      state.error = null;
    },

    clearError: state => {
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

export default authSlice.reducer;
