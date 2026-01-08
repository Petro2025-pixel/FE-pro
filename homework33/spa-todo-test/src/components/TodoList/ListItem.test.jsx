import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ListItem from './ListItem';
import { themes } from '../../themeContext';

describe('ListItem Component', () => {
  const defaultProps = {
    id: 1,
    description: 'Test Task',
    completed: false,
    theme: themes.light,
    onDelete: vi.fn(),
    onToggle: vi.fn(),
  };

  it('displays the task description and the correct theme color', () => {
    render(<ListItem {...defaultProps} />);
    
    const textElement = screen.getByText('Test Task');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveStyle({ color: themes.light.color });
  });

  it('applies strikethrough to text if the task is completed', () => {
    render(<ListItem {...defaultProps} completed={true} />);
    
    const textElement = screen.getByText('Test Task');
    expect(textElement).toHaveStyle({ textDecoration: 'line-through' });
  });

  it('calls onToggle when the "Done" button or checkbox is clicked', () => {
    const onToggleMock = vi.fn();
    render(<ListItem {...defaultProps} onToggle={onToggleMock} />);
    
    const doneButton = screen.getByRole('button', { name: /done/i });
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(doneButton);
    fireEvent.click(checkbox);

    expect(onToggleMock).toHaveBeenCalledTimes(2);
    expect(onToggleMock).toHaveBeenCalledWith(defaultProps.id);
  });

  it('calls onDelete when the "Delete" button is clicked', () => {
    const onDeleteMock = vi.fn();
    render(<ListItem {...defaultProps} onDelete={onDeleteMock} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledWith(defaultProps.id);
  });
});