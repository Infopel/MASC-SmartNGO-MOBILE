import { translate } from "i18n"
import { Icon } from "components/icon/icon"
import { IconButton, IIconButtonProps, useColorModeValue } from "native-base"
import { HomeBottomTabNavigatorParamList, navigate } from "navigators"
import * as React from "react"
import { findIconName } from "./home-navigator-bottom-bar.helper"

export interface HomeNavigatorBottomBarItemProps extends IIconButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */

  route: keyof HomeBottomTabNavigatorParamList
  selected: boolean
}

/**
 * Describe your component here
 */
export function HomeNavigatorBottomBarItem({
  route,
  selected,
  ...rest
}: HomeNavigatorBottomBarItemProps) {
  const trans = translate(`${route}.title`) ?? undefined

  const selectedColor = useColorModeValue("text.900", "text.100")
  const unSelectedColor = useColorModeValue("text.400", "text.600")

  return (
    <IconButton
      {...rest}
      accessibilityLabel={trans}
      accessibilityState={{ selected }}
      borderRadius={0}
      colorScheme="text"
      _icon={{ color: selected ? selectedColor : unSelectedColor }}
      icon={<Icon size="8" {...findIconName(route)} />}
      onPress={navigate.bind(this, route, undefined)}
    />
  )
}
