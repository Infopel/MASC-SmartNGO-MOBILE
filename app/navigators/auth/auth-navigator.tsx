import { createStackNavigator } from "@react-navigation/stack"
import { AuthNavigatorParamList } from "navigators/navigators"
import React from "react"
import { LoginScreen } from "screens/login/login-screen"

const Stack = createStackNavigator<AuthNavigatorParamList>()
export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  )
}
