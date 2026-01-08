import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contacts from './Contacts';
import { ThemeContext, themes } from '../../themeContext';

describe('Contacts Component', () => {
  it('renders title and link', () => {
    render(
      <ThemeContext.Provider value={{ theme: themes.light }}>
        <Contacts />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/Contacts content/i)).toBeInTheDocument();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/petro-lungu-308477384');
  });

it('applies theme styles from context', () => {
  const darkTheme = themes.dark;
  render(
    <ThemeContext.Provider value={{ theme: darkTheme }}>
      <Contacts />
    </ThemeContext.Provider>
  );

  const heading = screen.getByText(/Contacts content/i);
  const container = heading.closest('div');
  expect(container).toHaveStyle({ color: darkTheme.color });
});
});