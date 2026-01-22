import { describe, test, expect } from 'vitest';

describe('Axios Config - Simple Test', () => {
  test('axios config can be imported', async () => {
   
    const module = await import('./axiosConfig');
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('function');
  });

  test('creates axios instance', async () => {
    const axios = await import('axios');
    const axiosConfig = await import('./axiosConfig');
    
   
    expect(axiosConfig.default).toBeDefined();
    expect(axiosConfig.default.defaults).toBeDefined();
    expect(axiosConfig.default.defaults.baseURL).toBeDefined();
  });
});