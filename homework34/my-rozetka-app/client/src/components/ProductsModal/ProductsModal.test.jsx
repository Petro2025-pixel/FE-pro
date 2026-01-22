import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductsModal from './ProductsModal';
import { vi } from 'vitest';

describe('ProductsModal', () => {
  const mockHandleClose = vi.fn();
  const mockOnSubmit = vi.fn();

  const mockProduct = {
    id: 1,
    category: 'Laptops',
    name: 'MacBook Pro',
    quantity: '10',
    price: '2999.99',
    image: '/test.jpg',
    description: 'Test description',
  };

  test('renders add product modal', () => {
    render(
      <ProductsModal
        open={true}
        handleClose={mockHandleClose}
        product={null}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Add product')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter category...')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('renders edit product modal with data', () => {
    render(
      <ProductsModal
        open={true}
        handleClose={mockHandleClose}
        product={mockProduct}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('Edit product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Laptops')).toBeInTheDocument();
    expect(screen.getByDisplayValue('MacBook Pro')).toBeInTheDocument();
  });

  test('calls handleClose when cancel button clicked', () => {
    render(
      <ProductsModal
        open={true}
        handleClose={mockHandleClose}
        product={null}
        onSubmit={mockOnSubmit}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test('submits form with correct values', async () => {
    render(
      <ProductsModal
        open={true}
        handleClose={mockHandleClose}
        product={null}
        onSubmit={mockOnSubmit}
      />
    );

    const categoryInput = screen.getByPlaceholderText('Enter category...');
    const nameInput = screen.getByPlaceholderText('Enter name...');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(categoryInput, { target: { value: 'Phones' } });
    fireEvent.change(nameInput, { target: { value: 'iPhone 15' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
