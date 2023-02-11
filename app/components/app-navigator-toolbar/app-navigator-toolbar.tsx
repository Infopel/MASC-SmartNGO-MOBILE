import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import { StackHeaderProps } from "@react-navigation/stack"
import { Heading } from "components/heading/heading"
import { useToolbarColor } from "components/hooks"
import { Icon } from "components/icon/icon"
import { SyncErrorContainer } from "containers/sync-error/sync-error"
import { HStack, IconButton, VStack } from "native-base"
import { goBack } from "navigators/navigation-utilities"
import { NavigatorParamList } from "navigators/navigators"
import * as React from "react"
import { Platform } from "react-native"


export type AppNavigatorToolbarProps = {
  backButton?: boolean,
  route: RouteProp<NavigatorParamList>
  navigation: NavigationProp<NavigatorParamList>
  /**
   * Override the default title from i18n. 
  */
  title?: string
  onPressToolbarMenu?: () => void
  render?: React.ReactElement | React.ReactFragment
} & (StackHeaderProps | BottomTabHeaderProps)

/**
 * Describe your component here
 */
export function AppNavigatorToolbar({
  render,
  route: { name }, backButton = false, title, onPressToolbarMenu
}: AppNavigatorToolbarProps) {

  const isIOS = Platform.OS === "ios"
  const { bg, border } = useToolbarColor()


  return (
    <VStack>
      <SyncErrorContainer />
      <HStack py='3' px='1' borderLeftColor={border}
        borderRightColor={border}
        bg={bg}
        borderTopColor={border}
        borderBottomColor={border}
        borderWidth='1' shadow='3'
        m='0'
      >
        {backButton && <IconButton p={0} px='2' onPress={goBack} testID="back" colorScheme={'text'} icon={<Icon size={'xl'} name='arrow-back' type='material' />} />}
        <Heading flex={1} fontSize={'xl'} fontWeight='medium' textAlign={isIOS ? "center" : undefined} noOfLines={1}
          //@ts-ignore
          tx={`${name}.title`}>{title}</Heading>
        {onPressToolbarMenu && <IconButton p={0} onPress={onPressToolbarMenu} testID="menu" colorScheme={'text'} icon={<Icon onPress={onPressToolbarMenu} size={'xl'} name='dots-vertical' type='material-community' />} />
        }</HStack>
      {render}
    </VStack>
  )
}
