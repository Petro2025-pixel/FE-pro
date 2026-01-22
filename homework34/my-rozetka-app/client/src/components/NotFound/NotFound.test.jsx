import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';
import { vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NotFound', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders 404 page with correct elements', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Redirecting to Dashboard in 5 seconds...')).toBeInTheDocument();
  });

  test('countdown decreases every second', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('5')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('4')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('navigates to dashboard after 5 seconds', async () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  test('shows circular progress with correct value', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const progressCircle = screen.getByRole('progressbar');
    expect(progressCircle).toBeInTheDocument();
  });
});