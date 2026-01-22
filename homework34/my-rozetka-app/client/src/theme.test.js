import { expect, test, describe } from 'vitest';
import rozetkaTheme from './theme';

describe('Theme', () => {
  test('should have correct primary color', () => {
    expect(rozetkaTheme.palette.primary.main).toBe('#6db37e');
  });

  test('should have correct MuiTextField styles', () => {
    const textFieldStyles = rozetkaTheme.components.MuiTextField;
    
    expect(textFieldStyles.defaultProps.variant).toBe('filled');
    expect(textFieldStyles.defaultProps.hiddenLabel).toBe(true);
    
    expect(textFieldStyles.styleOverrides.root.backgroundColor).toBe('#dadada');
    expect(textFieldStyles.styleOverrides.root.borderRadius).toBe(0);
  });

  test('should have correct MuiButton styles', () => {
    const buttonStyles = rozetkaTheme.components.MuiButton;
    
    expect(buttonStyles.styleOverrides.root.borderRadius).toBe(0);
    expect(buttonStyles.styleOverrides.root.padding).toBe('12px 0');
    expect(buttonStyles.styleOverrides.root.fontSize).toBe('1.2rem');
    expect(buttonStyles.styleOverrides.root.fontWeight).toBe(900);
    expect(buttonStyles.styleOverrides.root.textTransform).toBe('none');
    
    expect(buttonStyles.styleOverrides.root['&:hover'].backgroundColor).toBe('#5da16d');
  });
});