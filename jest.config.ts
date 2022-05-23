import { pathsToModuleNameMapper } from 'ts-jest';

export default {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],

  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],

  preset: 'ts-jest',

  testEnvironment: 'node',
  setupFiles: ['./jest-setup-file.ts'],

  testMatch: ['<rootDir>/src/tests/**/*.spec.ts'],
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@infra/*': ['/infra/*'],
      '@modules/*': ['/modules/*'],
      '@tests/*': ['/tests/*'],
      '@configs/*': ['/configs/*'],
    },
    { prefix: '<rootDir>/src' },
  ),
};
