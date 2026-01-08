import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from './About';
import { ThemeContext, themes } from '../../themeContext';
import '@testing-library/jest-dom';

describe('About Component', () => {
  const renderWithTheme = (themeValue = themes.light) => {
    return render(
      <ThemeContext.Provider value={{ theme: themeValue }}>
        <About />
      </ThemeContext.Provider>
    );
  };

  it('renders localized headers and main title correctly', () => {
    renderWithTheme();

    expect(screen.getByText(/Project Overview/i)).toBeInTheDocument();
    
    expect(screen.getByText((content) => content.includes('Smart TODO Manager'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Потужний TODO Менеджер'))).toBeInTheDocument();
  });

  it('displays the technical stack in both languages', () => {
    renderWithTheme();

    expect(screen.getByText(/Core Stack:/i)).toBeInTheDocument();
    
    const contextApiElements = screen.getAllByText(/Context API/i);
    expect(contextApiElements.length).toBeGreaterThanOrEqual(1);
    
    expect(screen.getByText(/Технології:/i)).toBeInTheDocument();
    
    const localStorageElements = screen.getAllByText(/LocalStorage/i);
    expect(localStorageElements.length).toBeGreaterThanOrEqual(1);
  });

  it('applies theme colors to the main container and horizontal divider', () => {
    const darkTheme = themes.dark; 
    renderWithTheme(darkTheme);

    const mainTitle = screen.getByText(/Project Overview/i);
    const container = mainTitle.closest('div');
    
    expect(container).toHaveStyle(`color: ${darkTheme.color}`);

    const separator = screen.getByRole('separator');
    expect(separator).toHaveStyle(`border-color: ${darkTheme.color}`);
  });

  it('verifies that emojis are present in the headers', () => {
    renderWithTheme();
    
    expect(screen.getByText(/🚀/)).toBeInTheDocument();
    expect(screen.getByText(/🇺🇦/)).toBeInTheDocument();
  });
});