import { Icon } from "components/icon/icon"
import { Screen } from "components/screen/screen"
import { MonitoringVisitsListContainer } from "containers/monitoring-visits-list/monitoring-visits-list"
import { translate } from "i18n/translate"
import { Fab } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import { ScreenNavigationProps } from "navigators/navigators"
import React from "react"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `monitoringVisits: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="monitoringVisits" component={MonitoringVisitsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
interface MonitoringVisitsScreenProps extends ScreenNavigationProps<"monitoring-visits"> { }
export function MonitoringVisitsScreen(props: MonitoringVisitsScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen testID="monitoring-visits-screen">
      <MonitoringVisitsListContainer initiativeId={props.route.params.initiativeId} />
      <Fab
        icon={<Icon name='plus-circle' type="material-community" />}
        label={translate('monitoring-visits.add')}
        onPress={() => navigate('form', { formId: 'monitoring-visits', contextId: props.route.params.initiativeId })}
        renderInPortal={false}
         />

    </Screen>
  )
}
