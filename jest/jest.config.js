module.exports = {
  automock: false,
  browser: false,
  bail: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coverageDirectory: '<rootDir>../../.coverage',
  globals: {
    __DEV__: true
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'GlobalImageStub'
  },
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>../../node_modules/ts-jest/preprocessor.js',
    '^.+\\.css$': '<rootDir>/../../jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/../../jest/fileTransform.js'
  },

  setupFiles: ['<rootDir>../../jest/setupTests.js'],
  roots: ['<rootDir>../../'],

  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).ts?(x)'],

  verbose: true
};
