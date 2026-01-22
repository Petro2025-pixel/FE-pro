import { render, screen, fireEvent } from '@testing-library/react';
import DeleteModal from './DeleteModal';
import { vi } from 'vitest';

describe('DeleteModal', () => {
  const mockHandleClose = vi.fn();
  const mockOnConfirm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders delete confirmation modal', () => {
    render(
      <DeleteModal
        open={true}
        handleClose={mockHandleClose}
        onConfirm={mockOnConfirm}
      />
    );

    expect(screen.getByText('Are you sure you want to delete this product?')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('calls handleClose when cancel button clicked', () => {
    render(
      <DeleteModal
        open={true}
        handleClose={mockHandleClose}
        onConfirm={mockOnConfirm}
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  test('calls onConfirm when delete button clicked', () => {
    render(
      <DeleteModal
        open={true}
        handleClose={mockHandleClose}
        onConfirm={mockOnConfirm}
      />
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockHandleClose).not.toHaveBeenCalled();
  });

  test('does not render when open is false', () => {
    const { container } = render(
      <DeleteModal
        open={false}
        handleClose={mockHandleClose}
        onConfirm={mockOnConfirm}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});