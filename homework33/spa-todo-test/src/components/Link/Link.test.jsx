import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Link from './Link';
import { ThemeContext, themes } from '../../themeContext';

describe('Link Component', () => {
  const renderWithProviders = (ui, themeValue = themes.light) => {
    return render(
      <ThemeContext.Provider value={{ theme: themeValue }}>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </ThemeContext.Provider>
    );
  };

  it('renders an external link (a tag) when passed http/https', () => {
    const externalHref = 'https://google.com';
    renderWithProviders(<Link href={externalHref}>External</Link>);

    const link = screen.getByRole('link', { name: /external/i });
    
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', externalHref);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders an internal link (via NavLink) for regular paths', () => {
    const internalPath = '/about';
    renderWithProviders(<Link href={internalPath}>Internal</Link>);

    const link = screen.getByRole('link', { name: /internal/i });
    
    expect(link).toHaveAttribute('href', internalPath);
    expect(link).not.toHaveAttribute('target');
  });

  it('applies the current theme color', () => {
    const darkTheme = themes.dark; 
    renderWithProviders(<Link href="/test">Theme Link</Link>, darkTheme);

    const link = screen.getByRole('link');
    expect(link).toHaveStyle({ color: darkTheme.color });
  });
});