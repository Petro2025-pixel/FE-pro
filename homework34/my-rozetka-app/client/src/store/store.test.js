import { describe, test, expect } from 'vitest';

describe('Store Configuration - Simple Tests', () => {
  test('store module can be imported', async () => {
    const storeModule = await import('./index');
    expect(storeModule).toHaveProperty('default');
  });

  test('store has required methods', async () => {
    const storeModule = await import('./index');
    const store = storeModule.default;
    
    expect(store).toBeDefined();
    expect(typeof store.dispatch).toBe('function');
    expect(typeof store.getState).toBe('function');
    expect(typeof store.subscribe).toBe('function');
  });

  test('store has auth and products reducers', async () => {
    const storeModule = await import('./index');
    const store = storeModule.default;
    const state = store.getState();
    
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('products');
  });
});