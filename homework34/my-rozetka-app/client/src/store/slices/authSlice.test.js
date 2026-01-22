import { describe, test, expect, beforeEach } from 'vitest';
import authReducer, {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  clearError
} from './authSlice';

describe('authSlice', () => {
  const initialState = {
    token: null,
    loading: false,
    error: null,
  };

  beforeEach(() => {
    // Мок localStorage
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'removeItem');
  });

  test('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle loginRequest', () => {
    const state = authReducer(initialState, loginRequest());
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('should handle loginSuccess', () => {
    const token = 'test-token-123';
    const state = authReducer(initialState, loginSuccess(token));
    
    expect(state.token).toBe(token);
    expect(state.loading).toBe(false);
  });

  test('should handle loginFailure', () => {
    const error = 'Invalid credentials';
    const state = authReducer(initialState, loginFailure(error));
    
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  test('should handle logout', () => {
    const stateWithToken = { ...initialState, token: 'test-token' };
    const state = authReducer(stateWithToken, logout());
    
    expect(state.token).toBe(null);
  });

  test('should handle clearError', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const state = authReducer(stateWithError, clearError());
    
    expect(state.error).toBe(null);
  });
});