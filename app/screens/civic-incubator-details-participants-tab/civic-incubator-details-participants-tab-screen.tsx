import { Button } from "components/button/button"
import { Input } from "components/input/input"
import { Screen } from "components/screen/screen"
import { CivicIncubatorParticipantsListContainer } from "containers/civic-incubator-participants-list/civic-incubator-participants-list"
import { SearchIcon } from "native-base"
import { ScreenNavigationProps } from "navigators"
import { navigate } from "navigators/navigation-utilities"
import React from "react"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `civicIncubatorDetailsParticipantsTab: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="civicIncubatorDetailsParticipantsTab" component={CivicIncubatorDetailsParticipantsTabScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface CivicIncubatorDetailsParticipantsTabScreenProps extends ScreenNavigationProps<"civic-incubator-details-participants-tab"> { }
export function CivicIncubatorDetailsParticipantsTabScreen(props: CivicIncubatorDetailsParticipantsTabScreenProps) {

  const incubatorId: string = props.navigation.getParent()?.getState().routes.find((x) => x.name === 'civic-incubator-details')?.params.incubatorId

  const [text, setText] = React.useState<string>()

  return (
    <Screen testID="civic-incubator-details-participants-tab-screen">
      <Input value={text} onChangeText={setText} px='2' leftElement={<SearchIcon />} txPlaceholder='civic-incubator-details-participants-tab.search' />
      <CivicIncubatorParticipantsListContainer flex='1' searchText={text} incubatorId={incubatorId} />
      <Button tx='civic-incubator-details-participants-tab.add-participant' onPress={() => navigate('form', { formId: 'civic-incubator-participant', contextId: incubatorId })} />
    </Screen>
  )
}
