import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'; 
import ProductsTable from './ProductsTable';
import { vi } from 'vitest';


const mockReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};


const mockFetchProductsRequest = vi.fn(() => ({ type: 'TEST' }));
const mockAddProductRequest = vi.fn(() => ({ type: 'TEST' }));
const mockEditProductRequest = vi.fn(() => ({ type: 'TEST' }));
const mockDeleteProductRequest = vi.fn(() => ({ type: 'TEST' }));

vi.mock('../../store/slices/productsSlice', () => ({
  fetchProductsRequest: () => mockFetchProductsRequest(),
  addProductRequest: () => mockAddProductRequest(),
  editProductRequest: () => mockEditProductRequest(),
  deleteProductRequest: () => mockDeleteProductRequest(),
}));

describe('ProductsTable', () => {
  let store;

  beforeEach(() => {
   
    store = createStore(mockReducer, {
      products: {
        list: [
          { 
            id: 1, 
            category: 'Laptops', 
            name: 'MacBook Pro', 
            quantity: 10, 
            price: 2999.99, 
            image: '/test.jpg', 
            description: 'Test' 
          },
        ],
        loading: false,
        error: null,
      },
    });
  });

  test('renders table with products', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductsTable />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Products Table')).toBeInTheDocument();
  });

  test('shows empty state when no products', () => {
    const emptyStore = createStore(mockReducer, {
      products: {
        list: [],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={emptyStore}>
        <BrowserRouter>
          <ProductsTable />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Товари не знайдено')).toBeInTheDocument();
  });
});