// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  verbose: true,

  roots: ['<rootDir>/../../src'],

  coverageDirectory: 'coverage',

  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },

  moduleNameMapper: {
    '.+\\.(css|styl|sass|scss)$': 'identity-obj-proxy',
    '^@components(.*)$': '<rootDir>/../../src/components$1',
    '^@constants(.*)$': '<rootDir>/../../src/constants$1',
    '^@hooks(.*)$': '<rootDir>/../../src/hooks$1',
    '^@utils(.*)$': '<rootDir>/../../src/utils$1',
    '^@typings(.*)$': '<rootDir>/../../src/typings$1',
    '^@features(.*)$': '<rootDir>/../../src/features$1',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js'],

  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
};
