import { Screen } from "components/screen/screen"
import { LoginFormContainer } from "containers/login-form/login-form"
import { Image, VStack } from "native-base"
import { ScreenNavigationProps } from "navigators/navigators"
import React from "react"
// import { useNavigation } from "@react-navigation/native"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `login: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="login" component={LoginScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface LoginScreenProps extends ScreenNavigationProps<"login"> { }
export function LoginScreen(props: LoginScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen testID="login-screen">
      <VStack alignItems={'center'}>
        <Image resizeMode="center" size='72' source={require('../../../assets/images/logo.png')} alt='Logo' />
      </VStack>
      <LoginFormContainer />
    </Screen>
  )
}
