import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useToolbarColor } from "components/hooks"
import { translate } from "i18n/translate"
import { useToken } from "native-base"
import { SavingsGroupDetailsTabNavigatorParamList } from "navigators/navigators"
import React from "react"
import { SavingsGroupDetailsMonitoringTabScreen } from "screens/savings-group-details-monitoring-tab/savings-group-details-monitoring-tab-screen"
import { SavingsGroupDetailsMembersTabScreen } from "screens/savings-group-details-members-tab/savings-group-details-members-tab-screen"


const Tabs = createMaterialTopTabNavigator<SavingsGroupDetailsTabNavigatorParamList>()
export const SavingsGroupDetailsTabNavigator = () => {


  const color = useToken('colors', 'primary.500')
  const pressColor = useToken('colors', 'primary.200')

  const { bg, text } = useToolbarColor()
  const bgColor = useToken('colors', bg)
  const textColor = useToken('colors', text)

  return (
    <Tabs.Navigator screenOptions={{
      tabBarIndicatorStyle: {
        backgroundColor: color
      },
      tabBarIndicatorContainerStyle: {
        backgroundColor: bgColor
      },
      tabBarActiveTintColor: textColor,
      tabBarPressColor: pressColor
    }}>
      <Tabs.Screen name="savings-group-details-monitoring" component={SavingsGroupDetailsMonitoringTabScreen} options={{ title: translate('savings-group-details-monitoring-tab.title') }} />
      <Tabs.Screen name="savings-group-details-members" component={SavingsGroupDetailsMembersTabScreen} options={{ title: translate('savings-group-details-members-tab.title') }} />
    </Tabs.Navigator>
  )
}
