import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Header from './Header';
import { vi } from 'vitest';

const mockStore = configureStore([]);


const mockNavigate = vi.fn();
const mockLogout = vi.fn();


vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/dashboard' }),
  };
});


vi.mock('../../store/slices/authSlice', () => ({
  logout: () => mockLogout,
}));

describe('Header', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {},
    });
    vi.clearAllMocks();
  });

  test('renders logo and title', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header title="Test Title" />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByAltText('Rozetka')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders navigation buttons on dashboard', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header title="Dashboard" />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Preview')).toBeInTheDocument();
    expect(screen.getByText('About Tech')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('renders Add product button when onAddClick provided', () => {
    const mockOnAddClick = vi.fn();
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header title="Products" onAddClick={mockOnAddClick} />
        </BrowserRouter>
      </Provider>
    );

    const addButton = screen.getByText('Add product');
    expect(addButton).toBeInTheDocument();
    
    fireEvent.click(addButton);
    expect(mockOnAddClick).toHaveBeenCalledTimes(1);
  });

  test('navigates to dashboard when logo clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header title="Dashboard" />
        </BrowserRouter>
      </Provider>
    );

    const logo = screen.getByAltText('Rozetka');
    fireEvent.click(logo);
    
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});