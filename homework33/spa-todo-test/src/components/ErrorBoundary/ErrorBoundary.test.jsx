import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import { ThemeContext, themes } from '../../themeContext';

const ThrowError = () => {
  throw new Error("Test error");
};

describe('ErrorBoundary', () => {
  it('should display a fallback UI when an error occurs', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ThemeContext.Provider value={{ theme: themes.light }}>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </ThemeContext.Provider>
    );

    expect(screen.getByRole('link', { name: /go to main/i })).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('should render child components if there is no error', () => {
    render(
      <ThemeContext.Provider value={{ theme: themes.light }}>
        <ErrorBoundary>
          <div>Safe Content</div>
        </ErrorBoundary>
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/Safe Content/i)).toBeInTheDocument();
  });
});