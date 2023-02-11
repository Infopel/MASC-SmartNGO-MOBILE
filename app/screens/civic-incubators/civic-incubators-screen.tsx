import { Icon } from "components/icon/icon"
import { Input } from "components/input/input"
import { Screen } from "components/screen/screen"
import { CivicIncubatorsListContainer } from "containers/civic-incubators-list/civic-incubators-list"
import { Fab, VStack } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import { ScreenNavigationProps } from "navigators/navigators"
import React from "react"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `CivicIncubators: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="CivicIncubators" component={CivicIncubators} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface CivicIncubatorsScreenProps extends ScreenNavigationProps<"civic-incubators"> { }
export function CivicIncubatorsScreen(props: CivicIncubatorsScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen testID="civic-incubators-screen">
      <VStack space={2}>
      <Input txPlaceholder="civic-incubators.search" testID='filter-incubators' />
      <CivicIncubatorsListContainer />
      </VStack>
      <Fab renderInPortal={false} icon={<Icon name='add'/>} testID="new-incubator" onPress={navigate.bind(this, 'new-civic-incubator', undefined)} />
    </Screen>
  )
}
