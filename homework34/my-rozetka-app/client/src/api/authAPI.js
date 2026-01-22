import axiosInstance from './axiosConfig';

export const authAPI = {
  login: credentials => axiosInstance.post('/login', credentials),

  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve({ success: true });
  },
};
