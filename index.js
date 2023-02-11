// This is the first file that ReactNative will run when it starts up.
//
// We jump out of here immediately and into our main entry point instead.
//
// It is possible to have React Native load our main module first, but we'd have to
// change that in both AppDelegate.m and MainApplication.java.  This would have the
// side effect of breaking other tooling like mobile-center and react-native-rename.
//
// It's easier just to leave it here.
/**
 * @format
 */

import { AppRegistry } from "react-native"
import App from "./app/app"
import { name as appName } from "./app.json"

if (__DEV__) {
  require("react-native-url-polyfill/auto")
  const { native } = require("./app/services/api/mock/native")
  // native.listen()
}
import { ptForm } from 'yup-locale-pt';
import { setLocale } from 'yup';
setLocale(ptForm);

AppRegistry.registerComponent(appName, () => App)
