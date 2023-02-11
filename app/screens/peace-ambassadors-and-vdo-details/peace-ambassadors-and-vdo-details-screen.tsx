import { Button } from "components/button/button"
import { Screen } from "components/screen/screen"
import { PeaceAmbassadorsAndVdoActionsContainer } from "containers/peace-ambassadors-and-vdo-actions/peace-ambassadors-and-vdo-actions"
import { PeaceAmbassadorsAndVdoMembersContainer } from "containers/peace-ambassadors-and-vdo-members/peace-ambassadors-and-vdo-members"
import { Button as NBbtn } from "native-base"
import { ScreenNavigationProps } from "navigators/navigators"
import React from "react"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `peaceAmbassadorsAndVdoDetails: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="peaceAmbassadorsAndVdoDetails" component={PeaceAmbassadorsAndVdoDetailsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface PeaceAmbassadorsAndVdoDetailsScreenProps extends ScreenNavigationProps<"peace-ambassadors-and-vdo-details"> { }
export function PeaceAmbassadorsAndVdoDetailsScreen(props: PeaceAmbassadorsAndVdoDetailsScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const id = props.route.params.incubatorId
 

  const [isMembersVisible, setIsMembersVisible] = React.useState(true)
  return (
    <Screen testID="peace-ambassadors-and-vdo-details-screen">
      {/* <PeaceAmbassedorListItem item={{
        date: Date.now(), district: "KaMavota", province: "Maputo Cidade", id: "dsadsa", name: "Simpple Groupo", numberOfActiveMembers: 5
      }} /> */}
      <NBbtn.Group>
        <Button flex={1} variant={isMembersVisible ? "solid" : 'ghost'} tx="peace-ambassadors-and-vdo-details.members" onPress={setIsMembersVisible.bind(this, true)} />
        <Button flex={1} variant={!isMembersVisible ? "solid" : 'outline'} tx="peace-ambassadors-and-vdo-details.actions" onPress={setIsMembersVisible.bind(this, false)} />
      </NBbtn.Group>

      {isMembersVisible ? <PeaceAmbassadorsAndVdoMembersContainer initiativeId={id}  /> : <PeaceAmbassadorsAndVdoActionsContainer initiativeId={id} />}
    </Screen>
  )
}
