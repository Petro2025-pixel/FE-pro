import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import List from './List';
import { ThemeContext, themes } from '../../themeContext';

describe('List Component', () => {
  const mockTodos = [
    { id: 1, description: 'First Todo', completed: false },
    { id: 2, description: 'Second Todo', completed: true },
  ];

  const defaultProps = {
    todos: mockTodos,
    onDelete: vi.fn(),
    onToggle: vi.fn(),
  };

  const renderWithTheme = (ui, themeValue = themes.light) => {
    return render(
      <ThemeContext.Provider value={{ theme: themeValue }}>
        {ui}
      </ThemeContext.Provider>
    );
  };

  it('renders the correct number of ListItem elements', () => {
    renderWithTheme(<List {...defaultProps} />);
    
    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockTodos.length);
  });

  it('passes the current topic from the context to the list items', () => {
    const darkTheme = themes.dark;
    renderWithTheme(<List {...defaultProps} />, darkTheme);

    const firstTodoText = screen.getByText('First Todo');
    expect(firstTodoText).toHaveStyle({ color: darkTheme.color });
  });

  it('displays an empty list if the task array is empty', () => {
    renderWithTheme(<List {...defaultProps} todos={[]} />);
    
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });

  it('correctly passes the completed state to elements', () => {
    renderWithTheme(<List {...defaultProps} />);
    
    const completedTodo = screen.getByText('Second Todo');
    const activeTodo = screen.getByText('First Todo');

    expect(completedTodo).toHaveStyle({ textDecoration: 'line-through' });
    expect(activeTodo).toHaveStyle({ textDecoration: 'none' });
  });
});