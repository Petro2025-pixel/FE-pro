import { expect, test, vi, describe, beforeEach } from 'vitest';
import { productsAPI } from './productsAPI';
import axiosInstance from './axiosConfig';


vi.mock('./axiosConfig', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  }
}));

describe('Products API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    test('should fetch all products', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1' }];
      axiosInstance.get.mockResolvedValue({ data: mockProducts });

      const result = await productsAPI.getAll();

      expect(axiosInstance.get).toHaveBeenCalledWith('/products');
      expect(result.data).toEqual(mockProducts);
    });
  });

  describe('create', () => {
    test('should create a product', async () => {
      const product = { name: 'New Product', price: 100 };
      const mockResponse = { data: { id: 999, ...product } };
      axiosInstance.post.mockResolvedValue(mockResponse);

      const result = await productsAPI.create(product);

      expect(axiosInstance.post).toHaveBeenCalledWith('/products', product);
      expect(result.data).toEqual(mockResponse.data);
    });
  });

  describe('update', () => {
    test('should update a product', async () => {
      const id = 1;
      const product = { name: 'Updated Product', price: 150 };
      const mockResponse = { data: { id, ...product } };
      axiosInstance.put.mockResolvedValue(mockResponse);

      const result = await productsAPI.update(id, product);

      expect(axiosInstance.put).toHaveBeenCalledWith(`/products/${id}`, product);
      expect(result.data).toEqual(mockResponse.data);
    });
  });

  describe('delete', () => {
    test('should delete a product', async () => {
      const id = 1;
      const mockResponse = { data: { success: true } };
      axiosInstance.delete.mockResolvedValue(mockResponse);

      const result = await productsAPI.delete(id);

      expect(axiosInstance.delete).toHaveBeenCalledWith(`/products/${id}`);
      expect(result.data).toEqual(mockResponse.data);
    });
  });
});