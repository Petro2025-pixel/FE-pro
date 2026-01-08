import { render, screen } from '@testing-library/react';
import { it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header'; 
import { ThemeContext, themes } from '../../themeContext';

it('must contain the title TODO List', () => {
  render(
    <ThemeContext.Provider value={{ theme: themes.light, setTheme: () => {} }}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </ThemeContext.Provider>
  );
 
  const titleElement = screen.getByRole('heading', { level: 3, name: /todo list/i });
  expect(titleElement).toBeInTheDocument(); 
});