import React from "react"
import {  Text } from "components/text/text"
import { Screen} from "components/screen/screen"
import { navigate } from "navigators/navigation-utilities"
import { ScreenNavigationProps } from "navigators/navigators"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `montoringVisits: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="montoringVisits" component={MontoringVisitsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface MontoringVisitsScreenProps extends ScreenNavigationProps<"montoring-visits">{}
export function MontoringVisitsScreen(props: MontoringVisitsScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen testID="montoring-visits-screen">
      <Text>montoringVisits</Text>
    </Screen>
  )
}
