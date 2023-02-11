/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { useFlipper } from '@react-navigation/devtools'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react"
import React from "react"
import { useUserStore } from 'store/user/user.store'
import { AuthNavigator } from "./auth/auth-navigator"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { AppNavigatorParamList } from "./navigators"
import { PrimaryNavigator } from "./primary/primary-navigator"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppNavigatorParamList>()

const AppStack = () => {
  const {
    state,
  } = useUserStore()


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >

      {
        state === 'signed_in' ?
          <Stack.Screen name="primary" component={PrimaryNavigator} />
          : <Stack.Screen name="auth" component={AuthNavigator} />
      }
    </Stack.Navigator>
  )
}
interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = (props: NavigationProps) => {
  useFlipper(navigationRef);
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home-bottom-tabs"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
