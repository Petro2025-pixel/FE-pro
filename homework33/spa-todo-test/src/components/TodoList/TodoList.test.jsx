import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoList from './TodoList';
import { ThemeContext, themes } from '../../themeContext';

vi.mock('./Form', () => ({
  default: ({ addTodo }) => <div data-testid="mock-form">Form</div>
}));

vi.mock('./List', () => ({
  default: ({ todos }) => (
    <div data-testid="mock-list">
      {todos.map(t => <div key={t.id}>{t.description}</div>)}
    </div>
  )
}));

describe('TodoList Component', () => {
  const mockProps = {
    todos: [
      { id: 1, description: 'Task 1', completed: false },
      { id: 2, description: 'Task 2', completed: true }
    ],
    addTodo: vi.fn(),
    deleteTodo: vi.fn(),
    toggleTodoCompletion: vi.fn(),
  };

  const renderWithTheme = (ui, themeValue = themes.light) => {
    return render(
      <ThemeContext.Provider value={{ theme: themeValue }}>
        {ui}
      </ThemeContext.Provider>
    );
  };

  it('displays the title with the correct theme color', () => {
    const darkTheme = themes.dark;
    renderWithTheme(<TodoList {...mockProps} />, darkTheme);

    const title = screen.getByText(/TodoList content/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveStyle({ color: darkTheme.color });
  });

  it('renders child Form and List components', () => {
    renderWithTheme(<TodoList {...mockProps} />);

    expect(screen.getByTestId('mock-form')).toBeInTheDocument();
    expect(screen.getByTestId('mock-list')).toBeInTheDocument();
  });

  it('passes the correct list of tasks to the List component', () => {
    renderWithTheme(<TodoList {...mockProps} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('works correctly with an empty task list', () => {
    renderWithTheme(<TodoList {...mockProps} todos={[]} />);
    
    expect(screen.getByText(/TodoList content/i)).toBeInTheDocument();
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
  });
});