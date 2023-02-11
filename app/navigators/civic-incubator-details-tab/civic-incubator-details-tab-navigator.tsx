import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useToolbarColor } from "components/hooks"
import { translate } from "i18n/translate"
import { useContrastText, useToken } from "native-base"
import { CivicIncubatorDetailsTabNavigatorParamList } from "navigators/navigators"
import React from "react"
import { CivicIncubatorDetailsEventsTabScreen } from "screens/civic-incubator-details-events-tab/civic-incubator-details-events-tab-screen"
import { CivicIncubatorDetailsParticipantsTabScreen } from "screens/civic-incubator-details-participants-tab/civic-incubator-details-participants-tab-screen"



const Tabs = createMaterialTopTabNavigator<CivicIncubatorDetailsTabNavigatorParamList>()
export const CivicIncubatorDetailsTabNavigator = () => {
  const color = useToken('colors', 'primary.500')
  
  const { bg } = useToolbarColor()
  const bgColor = useToken('colors', bg)
  return (
    <Tabs.Navigator screenOptions={{
      tabBarIndicatorStyle: {
        backgroundColor: color
      },
      tabBarIndicatorContainerStyle:{
        backgroundColor:bgColor
      }
    }}>
      <Tabs.Screen name="civic-incubator-details-events-tab" component={CivicIncubatorDetailsEventsTabScreen} options={{ title: translate('civic-incubator-details-events-tab.title') }} />
      <Tabs.Screen name="civic-incubator-details-participants-tab" component={CivicIncubatorDetailsParticipantsTabScreen} options={{ title: translate('civic-incubator-details-participants-tab.title') }} />
    </Tabs.Navigator>
  )
}
