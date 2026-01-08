import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import React, { useState } from 'react';
import Switch from './Switch';
import { ThemeContext, themes } from '../../themeContext';

const TestThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

describe('Switch component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays "Dark Mode" and has the correct initial state (Light)', () => {
    render(
      <TestThemeProvider>
        <Switch />
      </TestThemeProvider>
    );

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText(/Dark Mode/i);

    expect(label).toBeInTheDocument();
    expect(checkbox.checked).toBe(false); 
  });

  it('toggles state on click', () => {
    render(
      <TestThemeProvider>
        <Switch />
      </TestThemeProvider>
    );

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});