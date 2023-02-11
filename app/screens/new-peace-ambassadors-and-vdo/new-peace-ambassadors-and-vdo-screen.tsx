import { Screen } from "components/screen/screen"
import { NewPeaceAmbassadorsAndVdoFormContainer } from "containers/new-peace-ambassadors-and-vdo-form/new-peace-ambassadors-and-vdo-form"
import { ScreenNavigationProps } from "navigators/navigators"
import React from "react"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `newPeaceAmbassadorsAndVdo: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="newPeaceAmbassadorsAndVdo" component={NewPeaceAmbassadorsAndVdoScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface NewPeaceAmbassadorsAndVdoScreenProps extends ScreenNavigationProps<"new-peace-ambassadors-and-vdo"> { }
export function NewPeaceAmbassadorsAndVdoScreen(props: NewPeaceAmbassadorsAndVdoScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  
  return (
    <Screen testID="new-peace-ambassadors-and-vdo-screen">
      <NewPeaceAmbassadorsAndVdoFormContainer type={props.route.params.type}/>
    </Screen>
  )
}
