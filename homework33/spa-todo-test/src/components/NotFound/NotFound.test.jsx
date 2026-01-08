import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';
import { ThemeContext, themes } from '../../themeContext';
import '@testing-library/jest-dom';

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe('NotFound Component', () => {
  const renderWithProviders = (themeValue = themes.light) => {
    return render(
      <ThemeContext.Provider value={{ theme: themeValue }}>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </ThemeContext.Provider>
    );
  };

  it('displays the 404 error text and redirect message', () => {
    renderWithProviders();
    expect(screen.getByText(/404 | Page is not found/i)).toBeInTheDocument();
    expect(screen.getByText(/You will be redirected/i)).toBeInTheDocument();
  });

  it('applies theme colors from context', () => {
    const darkTheme = themes.dark; 
    renderWithProviders(darkTheme);

    const heading = screen.getByRole('heading', { name: /404/i });
    const container = heading.parentElement;
    expect(container).toHaveStyle(`color: ${darkTheme.color}`);
    expect(container).toHaveStyle(`background-color: ${darkTheme.background}`);
  });

  it('redirects to home page after 5 seconds', () => {
    vi.useFakeTimers();
    renderWithProviders();

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    vi.useRealTimers();
  });

  it('updates the countdown timer every second', () => {
    vi.useFakeTimers();
    renderWithProviders();

    expect(screen.getByText('5')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('4')).toBeInTheDocument();

    vi.useRealTimers();
  });
});