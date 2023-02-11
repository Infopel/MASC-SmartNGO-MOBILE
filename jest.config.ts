import type {Config} from '@jest/types';
// const { pathsToModuleNameMapper } = require("ts-jest")
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
//const tsconfig = require("./tsconfig.json")
// Sync object
const config: Config.InitialOptions = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './tests/setup.js',
    './tests/setupTests.js',
  ],
  // moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
  //   prefix: "<rootDir>/app/",
  // }),
  setupFiles: [
    '@react-native-community/datetimepicker/jest/setup.js',
    '<rootDir>/node_modules/appcenter/test/AppCenterMock.js',
    '<rootDir>/node_modules/appcenter-analytics/test/AppCenterAnalyticsMock.js',
    '<rootDir>/node_modules/appcenter-crashes/test/AppCenterCrashesMock.js',
  ],
  transformIgnorePatterns: [
    'reactotron-react-native\node_modules\react-native-flipper',
  ],
  globals: {
    __TEST__: true,
  },
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        babelrc: false,
        presets: ['@babel/preset-typescript'],
      },
    ],
  },
  globalSetup: '<rootDir>/tests/globalSetup.js',
  // transform: {
  //   "^.+\\.(ts|tsx)$": "ts-jest",
  //   "\\.([jt]sx?)$": "babel-jest",
  // },
  testRegex: '(test|spec)\\.tsx?$',
};
export default config;
