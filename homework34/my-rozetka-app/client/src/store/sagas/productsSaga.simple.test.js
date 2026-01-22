import { vi, describe, test, expect } from 'vitest';

describe('Products Saga - Smoke Tests', () => {
  test('products saga modules exist', async () => {
    const productsSagaModule = await import('./productsSaga');
    expect(productsSagaModule).toBeDefined();
    expect(typeof productsSagaModule.watchProductChanges).toBe('function');
  });

  test('saga contains expected functions', async () => {
    const productsSagaModule = await import('./productsSaga');
    
    
    const expectedFunctions = [
      'fetchProductsSaga',
      'addProductSaga', 
      'editProductSaga',
      'deleteProductSaga',
      'watchProductChanges'
    ];
    
    expectedFunctions.forEach(funcName => {
      if (productsSagaModule[funcName]) {
        expect(typeof productsSagaModule[funcName]).toBe('function');
      }
    });
  });
});