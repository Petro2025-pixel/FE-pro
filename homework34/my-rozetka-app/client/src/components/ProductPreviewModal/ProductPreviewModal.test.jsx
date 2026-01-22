import { render, screen, fireEvent } from '@testing-library/react'; // ДОБАВИЛ fireEvent
import ProductPreviewModal from './ProductPreviewModal';
import { vi } from 'vitest';

describe('ProductPreviewModal', () => {
  const mockHandleClose = vi.fn();

  const mockProduct = {
    id: 1,
    category: 'Laptops',
    name: 'MacBook Pro 16" M3 Max',
    price: 3499.99,
    quantity: 15,
    image: '/images/macbook.jpg',
    description: 'Powerful laptop for professionals',
  };

  test('renders product preview modal with product data', () => {
    render(
      <ProductPreviewModal
        open={true}
        handleClose={mockHandleClose}
        product={mockProduct}
      />
    );

    expect(screen.getByText('Laptops')).toBeInTheDocument();
    expect(screen.getByText('MacBook Pro 16" M3 Max')).toBeInTheDocument();
    expect(screen.getByText('3,499.99₴')).toBeInTheDocument();
    expect(screen.getByText('В наявності: 15 шт.')).toBeInTheDocument();
  });

  test('does not render when product is null', () => {
    const { container } = render(
      <ProductPreviewModal
        open={true}
        handleClose={mockHandleClose}
        product={null}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders close button', () => {
    render(
      <ProductPreviewModal
        open={true}
        handleClose={mockHandleClose}
        product={mockProduct}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    
    fireEvent.click(closeButton);
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test('formats price correctly', () => {
    const productWithPrice = {
      ...mockProduct,
      price: 1234.5,
    };

    render(
      <ProductPreviewModal
        open={true}
        handleClose={mockHandleClose}
        product={productWithPrice}
      />
    );

    expect(screen.getByText('1,234.5₴')).toBeInTheDocument();
  });
});