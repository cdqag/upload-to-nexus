module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc-node/jest'],
  },
  transformIgnorePatterns: [],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@actions/http-client$': '<rootDir>/src/__mocks__/@actions/http-client.ts'
  },
  modulePathIgnorePatterns: [
      "__mocks__"
  ],
};
