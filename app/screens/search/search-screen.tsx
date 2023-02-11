import { Screen } from "components/screen/screen"
import { Text } from "components/text/text"
import { observer } from "mobx-react-lite"
import { ScreenNavigationProps } from "navigators"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `search: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="search" component={search} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface SearchScreenProps extends ScreenNavigationProps<"search">{}
export const SearchScreen: FC<SearchScreenProps> = observer(function search() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen preset="scroll">
      <Text tx="search.title" />
    </Screen>
  )
})
