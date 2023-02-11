module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:mocha/recommended'],
  plugins: ['detox', 'jest', 'mocha'],
  env: {'detox/detox': true, 'jest/globals': true},
  parser: 'babel-eslint',
};
