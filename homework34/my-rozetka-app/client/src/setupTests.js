// src/setupTests.js
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Отключаем предупреждения MUI в тестах
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('MUI Grid:') || 
     args[0].includes('Warning:') ||
     args[0].includes('Deprecation:'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// Очистка после каждого теста
afterEach(() => {
  cleanup();
});