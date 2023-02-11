import { Icon } from "components/icon/icon"
import { Screen } from "components/screen/screen"
import { ActionPlanListContainer } from "containers/action-plan-list/action-plan-list"
import { translate } from "i18n/translate"
import { Fab } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import { ScreenNavigationProps } from "navigators/navigators"
import React from "react"

interface ActionPlanScreenProps extends ScreenNavigationProps<"action-plan"> { }
export function ActionPlanScreen(props: ActionPlanScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen testID="action-plan-screen">
      <ActionPlanListContainer initiativeId={props.route.params.initiativeId} />
      <Fab icon={<Icon name='plus-circle' type="material-community" />} label={translate('action-plan.add')} onPress={() => navigate('form', { formId: 'action-plan',contextId: props.route.params.initiativeId })} renderInPortal={false} />
    </Screen>
  )
}
