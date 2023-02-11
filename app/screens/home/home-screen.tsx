import { Screen } from "components/screen/screen"
import { HStack, View, VStack } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import { ScreenNavigationProps } from "navigators/navigators"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { HomeButton } from "./home.button"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `home: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="home" component={home} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface HomeScreenProps extends ScreenNavigationProps<"home"> { }
export const HomeScreen: FC<HomeScreenProps> = () => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen testID="home-screen" preset="scroll">
      <VStack space={2}>
        <HStack space={2}>
          <HomeButton
            onPress={navigate.bind(this, "my-tasks", undefined)}
            icon="text-box-check-outline"
            tx="home.my-tasks"
          />
          <HomeButton icon="account-group-outline" tx="home.group-savings" onPress={navigate.bind(this, 'savings-group', undefined)} />
        </HStack>
        <HStack space={2}>
          <HomeButton icon="layers-triple-outline" tx="home.civic-incubators" onPress={navigate.bind(this, 'civic-incubators', undefined)} />
          <HomeButton icon="sync" tx="home.vdo"  onPress={() => navigate('peace-ambassadors-and-vdo', { type: 'vdo' })}/>
        </HStack>
        <HStack>
          <HomeButton style={{ width: '50%' }} icon="layers-triple-outline" tx="home.peace-ambassadors" onPress={() => navigate('peace-ambassadors-and-vdo', { type: 'peace-ambassadors' })} />
          <View flex={1} />
        </HStack>
      </VStack>
    </Screen>
  )
}
