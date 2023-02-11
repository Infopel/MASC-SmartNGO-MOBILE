import { Icon } from "components/icon/icon"
import { Screen } from "components/screen/screen"
import { SavingsGroupListContainer } from "containers/savings-group-list/savings-group-list"
import { Fab, View } from "native-base"
import { ScreenNavigationProps } from "navigators/navigators"
import { navigate } from "navigators/navigation-utilities"
import React from "react"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `savingsGroup: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="savingsGroup" component={SavingsGroupScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface SavingsGroupScreenProps extends ScreenNavigationProps<"savings-group"> { }
export function SavingsGroupScreen(props: SavingsGroupScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen testID="savings-group-screen">
      <View h='2'/>
      <SavingsGroupListContainer />
      <Fab renderInPortal={false} icon={<Icon name='add' />} onPress={navigate.bind(this, 'form', {formId:'savings-group'})} />
    </Screen>
  )
}
