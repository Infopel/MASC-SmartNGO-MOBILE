import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AppNavigatorToolbar } from "components/app-navigator-toolbar/app-navigator-toolbar"
import { HomeNavigatorBottomBar } from "components/home-navigator-bottom-bar/home-navigator-bottom-bar"
import { UserProfileAndExitDialogContainer } from "containers/user-profile-and-exit-dialog/user-profile-and-exit-dialog"
import { useDisclose } from "native-base"
import { HomeBottomTabNavigatorParamList } from "navigators/navigators"
import React from "react"
import { HomeScreen } from "screens/home/home-screen"
import { SearchScreen } from "screens/search/search-screen"
import { SettingsScreen } from "screens/settings/settings-screen"
import { StatsScreen } from "screens/stats/stats-screen"
import { SyncScreen } from "screens/sync/sync-screen"

const Tabs = createBottomTabNavigator<HomeBottomTabNavigatorParamList>()
export const HomeBottomTabNavigator = () => {
  const { isOpen, onClose, onOpen } = useDisclose()
  return (
    <Tabs.Navigator
      //@ts-ignore
      tabBar={(props) => <HomeNavigatorBottomBar {...props} />}
      screenOptions={{
        //@ts-ignore
        header: (props) => <AppNavigatorToolbar {...props} render={<UserProfileAndExitDialogContainer isOpen={isOpen} onClose={onClose} />} onPressToolbarMenu={onOpen} />,
        headerShown: true,
      }}
    >
      <Tabs.Screen name="home" component={HomeScreen} />
      <Tabs.Screen name="search" component={SearchScreen} />
      <Tabs.Screen name="stats" component={StatsScreen} />
      <Tabs.Screen name="sync" component={SyncScreen} />
      <Tabs.Screen name="settings" component={SettingsScreen} />
    </Tabs.Navigator>
  )
}
