import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { it, expect, describe, beforeEach } from 'vitest';
import App from './App';

describe('Todo App Integration Tests', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('allows you to enter letters and numbers and successfully adds a task', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Task 12345' } });
    fireEvent.click(button);

    expect(screen.getByText('Task 12345')).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  it('shows an error when entering less than 5 characters', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.click(button);
    expect(screen.getByText(/at least 5 characters/i)).toBeInTheDocument();
  });

  it('adds a task when pressing Enter', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Pressing Enter' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText('Pressing Enter')).toBeInTheDocument();
  });

  it('deletes a task when clicking the delete button', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Task for deletion' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    const taskText = screen.getByText('Task for deletion');
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);

    expect(taskText).not.toBeInTheDocument();
  });

  it('toggles theme and saves it to localStorage', async () => {
    render(<App />);
    const themeSwitch = screen.getByLabelText(/dark mode/i);
    fireEvent.click(themeSwitch);
    
    await waitFor(() => {
      const savedTheme = JSON.parse(localStorage.getItem('appTheme'));
      expect(savedTheme.color).toBe('#ffffff'); 
    });
  });

  it('navigates to the Contacts page when clicking the link in Header', async () => {
    render(<App />);
    
    const contactsLinks = screen.getAllByText(/contacts/i);
    fireEvent.click(contactsLinks[0]);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /contacts content/i })).toBeInTheDocument();
    });
  });
});