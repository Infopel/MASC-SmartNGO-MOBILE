import { Screen } from "components/screen/screen"
import { NewCivicIncubatorFormContainer } from "containers/new-civic-incubator-form/new-civic-incubator-form"
import { ScreenNavigationProps } from "navigators/navigators"
import React from "react"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `newCivicIncubator: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="newCivicIncubator" component={NewCivicIncubator} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface NewCivicIncubatorScreenProps extends ScreenNavigationProps<"new-civic-incubator"> { }
export function NewCivicIncubatorScreen(props: NewCivicIncubatorScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()


  return (
    <Screen testID="new-civic-incubator-screen">
      <NewCivicIncubatorFormContainer/>
    </Screen>
  )
}
