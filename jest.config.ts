import type { Config } from 'jest';
import nextJest from 'next/jest';

// Создаем конфигурацию для Next.js
const createJestConfig = nextJest({
  dir: './', // Путь к вашему приложению Next.js
});

// Добавляем любую пользовательскую конфигурацию, которая будет передана Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Настройка для алиасов
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Укажите файл настройки Jest
};

// Экспортируем конфигурацию
export default createJestConfig(config);