import { Screen } from "components/screen/screen"
import { SavingsGroupMonitoringListContainer } from "containers/savings-group-monitoring-list/savings-group-monitoring-list"
import { ScreenNavigationProps } from "navigators/navigators"
import React from "react"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `savingsGroupDetailsMonitoringTab: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="savingsGroupDetailsMonitoringTab" component={SavingsGroupDetailsMonitoringTabScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type

interface SavingsGroupDetailsMonitoringTabScreenProps extends ScreenNavigationProps<"savings-group-details-monitoring"> { }
export function SavingsGroupDetailsMonitoringTabScreen(props: SavingsGroupDetailsMonitoringTabScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const savingsGroupId: string = props.navigation.getParent()?.getState().routes.find((x) => x.name === 'savings-group-details')?.params.id

  return (
    <Screen testID="savings-group-details-monitoring-tab-screen">
      <SavingsGroupMonitoringListContainer savingsGroupId={savingsGroupId} />
    </Screen>
  )
}
