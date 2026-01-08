import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./App.jsx', () => ({
  default: () => <div data-testid="app-root">App Component</div>
}));

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn()
  }))
}));

describe('Main entry point', () => {
  beforeEach(() => {
    
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('should render App component inside StrictMode', async () => {
    
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    await import('./main.jsx');

    const { createRoot } = await import('react-dom/client');
    expect(createRoot).toHaveBeenCalledWith(root);
  });
});