module.exports = {
  maxWorkers: 1,
  testTimeout: 120000,
  verbose: false,
  reporters: ['detox/runners/jest/reporter'],
  // globalSetup: 'detox/runners/jest/globalSetup' //!DEFAULT,
  globalTeardown: 'detox/runners/jest/globalTeardown',
  testEnvironment: 'detox/runners/jest/testEnvironment',

  globalSetup: './global-setup.js',
  // globalTeardown: './global-teardown.js',
  // setupFilesAfterEnv: ['./setupTestFramework.js'],
  // testEnvironment: './environment',
  // testRunner: 'jest-circus/runner',
  // testTimeout: 60000,
  testRegex: '\\.e2e\\.ts$',
  transform: {
    '\\.tsx?$': 'ts-jest',
    '\\.[tj]sx?$': 'ts-jest',
  },
};
