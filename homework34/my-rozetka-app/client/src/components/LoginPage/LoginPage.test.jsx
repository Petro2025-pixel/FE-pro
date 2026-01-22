import { describe, test, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import authReducer from '../../store/slices/authSlice';

describe('LoginPage', () => {
  const createMockStore = (state = {}) => {
    return configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: state },
    });
  };

  const renderLoginPage = (store) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders login form', () => {
    const store = createMockStore();
    renderLoginPage(store);
    
    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('password visibility toggle', () => {
    const store = createMockStore();
    renderLoginPage(store);
    
    const passwordInput = screen.getByPlaceholderText('Password');
    const toggleButton = screen.getByRole('button', { name: '' });
    
   
    expect(passwordInput.type).toBe('password');
    
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    
    
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });
});