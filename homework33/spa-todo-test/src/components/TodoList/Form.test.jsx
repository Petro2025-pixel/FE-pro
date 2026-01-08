import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect, vi } from 'vitest';
import Form from './Form'; 

it('allows you to enter letters and numbers in the description field', () => {
  const mockAddTodo = vi.fn();
  
  render(<Form addTodo={mockAddTodo} />);
  
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /send/i });

  fireEvent.change(input, { target: { value: 'Test 123' } });
  fireEvent.click(button);
  
  expect(mockAddTodo).toHaveBeenCalledWith('Test 123');

  fireEvent.change(input, { target: { value: '987654321' } });
  fireEvent.click(button);
  
  expect(mockAddTodo).toHaveBeenCalledWith('987654321');
});

it('does not call addTodo if less than 5 characters (numbers or letters) are entered', () => {
  const mockAddTodo = vi.fn();
  render(<Form addTodo={mockAddTodo} />);
  
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /send/i });

  fireEvent.change(input, { target: { value: '12a' } });
  fireEvent.click(button);

  expect(mockAddTodo).not.toHaveBeenCalled();
  
  const error = screen.getByText(/at least 5 characters/i);
  expect(error).toBeInTheDocument();
});

it('displays an error if you click the "Send" button with an empty field', () => {
  const mockAddTodo = vi.fn();
  render(<Form addTodo={mockAddTodo} />);
  
  const button = screen.getByRole('button', { name: /send/i });

  fireEvent.click(button);

  const errorMessage = screen.getByText(/the task description must contain at least 5 characters/i);
  expect(errorMessage).toBeInTheDocument();
  
  expect(mockAddTodo).not.toHaveBeenCalled();
});