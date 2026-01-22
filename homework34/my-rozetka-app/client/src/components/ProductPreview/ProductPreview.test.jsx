import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import ProductPreview from './ProductPreview';
import { vi } from 'vitest';


const mockReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};


const mockFetchProductsRequest = vi.fn(() => ({ type: 'TEST' }));
const mockAddProductRequest = vi.fn(() => ({ type: 'TEST' }));

vi.mock('../../store/slices/productsSlice', () => ({
  fetchProductsRequest: () => mockFetchProductsRequest(),
  addProductRequest: () => mockAddProductRequest(),
}));

describe('ProductPreview', () => {
  let store;

  beforeEach(() => {
   
    store = createStore(mockReducer, {
      products: {
        list: [
          {
            id: 1,
            name: 'MacBook Pro',
            price: 2999.99,
            quantity: 10,
            category: 'Laptops',
            image: '/test.jpg',
            description: 'Test',
          },
        ],
        loading: false,
        error: null,
      },
    });
  });

  test('renders preview page with products', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductPreview />
        </BrowserRouter>
      </Provider>
    );

  
    expect(screen.getByRole('heading', { name: 'Preview', level: 2 })).toBeInTheDocument();
    
    
  });

  test('shows products in the grid', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductPreview />
        </BrowserRouter>
      </Provider>
    );

    
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
    expect(screen.getByText('2999.99₴')).toBeInTheDocument();
    expect(screen.getByText('Кількість: 10')).toBeInTheDocument();
  });
});