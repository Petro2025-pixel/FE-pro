import axiosInstance from './axiosConfig';

export const productsAPI = {
  getAll: () => axiosInstance.get('/products'),
  create: product => axiosInstance.post('/products', product),
  update: (id, product) => axiosInstance.put(`/products/${id}`, product),
  delete: id => axiosInstance.delete(`/products/${id}`),
};
