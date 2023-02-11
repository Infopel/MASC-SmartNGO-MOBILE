import { Button } from "components/button/button"
import { Input } from "components/input/input"
import { Screen } from "components/screen/screen"
import { CivicIncubatorEventsListContainer } from "containers/civic-incubator-events-list/civic-incubator-events-list"
import { SearchIcon } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import { ScreenNavigationProps } from "navigators/navigators"
import React from "react"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `civicIncubatorDetailsEventsTab: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="civicIncubatorDetailsEventsTab" component={CivicIncubatorDetailsEventsTabScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface CivicIncubatorDetailsEventsTabScreenProps extends ScreenNavigationProps<"civic-incubator-details-events-tab">{}
export function CivicIncubatorDetailsEventsTabScreen(props: CivicIncubatorDetailsEventsTabScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const incubatorId: string = props.navigation.getParent()?.getState().routes.find((x) => x.name === 'civic-incubator-details')?.params.incubatorId

  const [text, setText] = React.useState<string>()

  return (
    <Screen testID="civic-incubator-details-events-tab-screen">
      <Input value={text} onChangeText={setText} px='2' leftElement={<SearchIcon />} txPlaceholder='civic-incubator-details-events-tab.search' />
      <CivicIncubatorEventsListContainer flex='1' searchText={text} incubatorId={incubatorId} />
      <Button tx='civic-incubator-details-events-tab.add-event' onPress={() => navigate('form', { formId: 'civic-incubator-events', contextId: incubatorId })} />
    </Screen>
  )
}
