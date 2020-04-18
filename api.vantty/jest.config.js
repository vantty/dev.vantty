const { defaults } = require('jest-config');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js}', '!**/node_modules/**'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['html', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  testEnvironment: 'node',
  verbose: true,
};
