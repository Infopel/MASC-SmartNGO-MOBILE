import { useToolbarColor } from "components/hooks"
import { Button as NBButton, HStack, useColorModeValue } from "native-base"
import { TabBarProps } from "navigators/navigators"
import * as React from "react"
import { TabBarButton } from "./tab-bar-button"

export interface AppTabbarProps extends TabBarProps {

}

/**
 * Describe your component here
 */
export function AppTabbar({ state, jumpTo,navigation: { navigate } }: AppTabbarProps) {

  const routes = state.routes
const {bg,border} = useToolbarColor()
  console.log({jumpTo})

  return (
    <HStack
      m='0'
      bg={bg}
      borderLeftColor={border}
      borderBottomColor={border}
      borderRightColor={border}
      borderTopColor={bg}
      borderBottomWidth='1'
      shadow='3'
      alignItems={'center'}
      justifyContent='space-evenly'
      w='full'
      py='2'
    >
      {routes.map((item, index) => <TabBarButton tx={item.name} selected={index === state.index} onPress={jumpTo.bind(this, item.key, undefined)} />)}
    </HStack>
  )
}

