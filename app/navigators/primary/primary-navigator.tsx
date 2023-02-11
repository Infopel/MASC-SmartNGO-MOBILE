import { createStackNavigator } from "@react-navigation/stack"
import { AppNavigatorToolbar, AppNavigatorToolbarProps } from "components/app-navigator-toolbar/app-navigator-toolbar"
import { CivicIncubatorToolbarContainer } from "containers/civic-incubator-toolbar/civic-incubator-toolbar"
import { FormToolbarContainer } from "containers/form-toolbar/form-toolbar"
import { SavingsGroupToolbarContainer } from "containers/savings-group-toolbar/savings-group-toolbar"
import { translate } from "i18n/translate"
import { CivicIncubatorDetailsTabNavigator } from "navigators/civic-incubator-details-tab/civic-incubator-details-tab-navigator"
import { HomeBottomTabNavigator } from "navigators/home-bottom-tab/home-bottom-tab-navigator"
import { isPeaceAmbassadorsAndVdoRoute, PrimaryNavigatorParamList } from "navigators/navigators.d"
import { SavingsGroupDetailsTabNavigator } from "navigators/savings-group-details-tab/savings-group-details-tab-navigator"
import React from "react"
import { ActionPlanScreen } from "screens/action-plan/action-plan-screen"
import { CivicIncubatorsScreen } from "screens/civic-incubators/civic-incubators-screen"
import { FormScreen } from "screens/form/form-screen"
import { MyTasksScreen } from "screens/my-tasks/my-tasks-screen"
import { NewCivicIncubatorScreen } from "screens/new-civic-incubator/new-civic-incubator-screen"
import { NewPeaceAmbassadorsAndVdoScreen } from "screens/new-peace-ambassadors-and-vdo/new-peace-ambassadors-and-vdo-screen"
import { PeaceAmbassadorsAndVdoDetailsScreen } from "screens/peace-ambassadors-and-vdo-details/peace-ambassadors-and-vdo-details-screen"
import { PeaceAmbassadorsAndVdoScreen } from "screens/peace-ambassadors-and-vdo/peace-ambassadors-and-vdo-screen"
import { SavingsGroupScreen } from "screens/savings-group/savings-group-screen"
import { MonitoringVisitsScreen } from "screens/monitoring-visits/monitoring-visits-screen"


const Stack = createStackNavigator<PrimaryNavigatorParamList>()
export const PrimaryNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      cardStyle: { backgroundColor: "transparent" }, headerShown: true,
      header: props => <AppNavigatorToolbar {...props} backButton />
    }}>
      <Stack.Screen name="home-bottom-tabs" component={HomeBottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="my-tasks" component={MyTasksScreen} />
      <Stack.Screen name="form" component={FormScreen} options={{ header: (props) => <FormToolbarContainer {...props} /> }} />
      <Stack.Screen name="civic-incubators" component={CivicIncubatorsScreen} />
      <Stack.Screen name="new-civic-incubator" component={NewCivicIncubatorScreen} />
      <Stack.Screen name="civic-incubator-details" component={CivicIncubatorDetailsTabNavigator} options={{ header: (props) => <CivicIncubatorToolbarContainer {...props} /> }} />
      <Stack.Screen name="savings-group" component={SavingsGroupScreen} />
      <Stack.Screen name="action-plan" component={ActionPlanScreen} />
      <Stack.Screen name="monitoring-visits" component={MonitoringVisitsScreen} />
      <Stack.Screen name="savings-group-details" component={SavingsGroupDetailsTabNavigator} options={{ header: (props) => <SavingsGroupToolbarContainer {...props} /> }} />
      <Stack.Screen name="peace-ambassadors-and-vdo" component={PeaceAmbassadorsAndVdoScreen} options={{ header: (props) => <PeaceAmbassadorsAndVdoToolbar {...props} /> }} />
      <Stack.Screen name="new-peace-ambassadors-and-vdo" component={NewPeaceAmbassadorsAndVdoScreen} options={{ header: (props) => <PeaceAmbassadorsAndVdoToolbar {...props} /> }} />
      <Stack.Screen name="peace-ambassadors-and-vdo-details" component={PeaceAmbassadorsAndVdoDetailsScreen} options={{ header: (props) => <CivicIncubatorToolbarContainer {...props} /> }} />
    </Stack.Navigator>
  )
}




function PeaceAmbassadorsAndVdoToolbar(props: AppNavigatorToolbarProps) {
  const route = props.route
  let title: string | undefined = undefined
  if (isPeaceAmbassadorsAndVdoRoute(route)) {
    const name = route.name

    title = translate(`${name}.${route.params.type}.title`)
  }

  return <AppNavigatorToolbar title={title} backButton {...props} />
}