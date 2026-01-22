import { expect, test, vi, describe, beforeEach } from 'vitest';
import { authAPI } from './authAPI';
import axiosInstance from './axiosConfig';


vi.mock('./axiosConfig', () => ({
  default: {
    post: vi.fn(),
  }
}));

describe('Auth API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    test('should call login API with credentials', async () => {
      const credentials = { email: 'test@test.com', password: 'password' };
      const mockResponse = { data: { token: 'test-token' } };

      
      axiosInstance.post.mockResolvedValue(mockResponse);

      
      const result = await authAPI.login(credentials);

    
      expect(axiosInstance.post).toHaveBeenCalledWith('/login', credentials);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('logout', () => {
    beforeEach(() => {
   
      Storage.prototype.removeItem = vi.fn();
    });

    test('should remove token from localStorage and return success', async () => {
      const result = await authAPI.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(result).toEqual({ success: true });
    });
  });
});