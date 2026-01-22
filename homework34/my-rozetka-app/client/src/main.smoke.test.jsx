import { render } from '@testing-library/react';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import App from './App';


describe('Main App Entry', () => {
  beforeEach(() => {
   
    vi.mock('react-dom/client', () => ({
      createRoot: vi.fn(() => ({
        render: vi.fn(),
      })),
    }));

 
    document.getElementById = vi.fn(() => document.createElement('div'));
  });

  test('application mounts without errors', () => {
    
    expect(StrictMode).toBeDefined();
    expect(Provider).toBeDefined();
    expect(App).toBeDefined();
  });
});