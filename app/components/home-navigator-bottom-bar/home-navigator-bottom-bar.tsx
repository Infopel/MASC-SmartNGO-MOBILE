import { BottomTabBarProps, BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs"
import { NavigationHelpers, TabNavigationState } from "@react-navigation/native"
import { HStack, useColorModeValue } from "native-base"
import { HomeBottomTabNavigatorParamList } from "navigators/navigators"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import logger from "utils/logger"
import { HomeNavigatorBottomBarItem } from "./home-navigator-bottom-bar.item"

export interface HomeNavigatorBottomBarProps extends BottomTabBarProps {
  /**
   * An optional style override useful for padding & margin.
   */

  style?: StyleProp<ViewStyle>
  state: TabNavigationState<HomeBottomTabNavigatorParamList>
  navigation: NavigationHelpers<HomeBottomTabNavigatorParamList, BottomTabNavigationEventMap>
}

/**
 * Describe your component here
 */
export const HomeNavigatorBottomBar = function HomeNavigatorBottomBar({
  state: { routeNames, index },
  insets,
  style,
}: HomeNavigatorBottomBarProps) {
  const route = routeNames[index]
  const bg = useColorModeValue("light.50", "dark.100")
  return (
    <HStack h={["16"]} bg={bg}>
      {routeNames.map((s) => (
        <HomeNavigatorBottomBarItem key={s} route={s} selected={route === s} flex={1} />
      ))}
    </HStack>
  )
}
