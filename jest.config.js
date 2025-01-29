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

  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './test-results/junit',
        suiteName: 'Unit Tests',
        classNameTemplate: '{suitename}',
        titleTemplate: '{classname}-{title}',
        usePathForSuiteName: 'true',
      },
    ],
  ],
};
