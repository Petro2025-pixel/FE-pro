import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { describe, test, expect } from 'vitest';
import App from './App';


const mockReducer = (state = {}, action) => state;
const mockStore = createStore(mockReducer, {
  auth: { token: null },
  products: { list: [] },
});

describe('App - Smoke Test', () => {
  test('App renders without throwing', () => {
    
    const renderApp = () => {
      try {
        render(
          <Provider store={mockStore}>
            <App />
          </Provider>
        );
        return true;
      } catch (error) {
        console.error('App render error:', error.message);
        return false;
      }
    };

    expect(renderApp()).toBe(true);
  });
});