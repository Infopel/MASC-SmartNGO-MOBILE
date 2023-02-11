/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import React, { useEffect, useState } from "react";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import './../globals.ts';
import "./i18n";
import { initFonts } from "./theme/fonts"; // expo
import "./utils/ignore-warnings";

import DatabaseProviderComponent from "@nozbe/watermelondb/DatabaseProvider";
import { RootStore, RootStoreProvider, setupRootStore } from "models";
import { useNavigationPersistence } from "navigators/navigation-utilities";
import { AppNavigator } from "navigators/root-navigator";
import { LogBox } from 'react-native';
import codePush from "react-native-code-push";
import { database } from "storage/database";
import { useUserStore } from "store/user/user.store";
import { ErrorBoundary } from "./screens/error/error-boundary";
import { NativeBaseProvider } from "./theme/theme";
import * as storage from "./utils/storage/storage";

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

LogBox.ignoreLogs([/http:\/\/localhost:8081\/symbolicate/, /http:\/\/10.0.2.2:8081\/symbolicate/, /Could not find Fiber with id/])

/**
 * This is the root component of our app.
 */
function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const authLocalUser = useUserStore((state)=> state.authLocalUser)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ; (async () => {
      await initFonts() // expo
      // try { await resetDatabase() } catch (e) { console.log(e) } // DatabaseSyncronization
      // try { await populateFindAllLocations() } catch (e) { console.log(e) } // DatabaseSyncronization
      // try { await populateFindActionTypes() } catch (e) { console.log(e) } // DatabaseSyncronization
      setupRootStore().then(setRootStore)
    })()
    authLocalUser()
  }, [])


  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish..
  if (!rootStore || !isNavigationStateRestored) return null

  // otherwise, we're ready to render the app
  return (
    // <ToggleStorybook>
    <DatabaseProviderComponent database={database}>
      <RootStoreProvider value={rootStore}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <NativeBaseProvider>
            <ErrorBoundary catchErrors={"always"}>
              <AppNavigator
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </ErrorBoundary>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </RootStoreProvider>
    </DatabaseProviderComponent>
    // </ToggleStorybook>
  )
}

export default codePush(App)
