import { Card } from "components/card/card"
import { useIsPressed } from "components/hooks"
import { Text } from "components/text/text"
import { Avatar, HStack, Pressable, usePropsResolution, VStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { IPeaceEmbassadorVDO } from "storage/queries/initiative"
import { DateUtils } from "utils/DateUitls"

export interface PeaceAmbassedorListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  item: IPeaceEmbassadorVDO

  onNavigate?: () => void
}

/**
 * Describe your component here
 */
export const PeaceAmbassedorListItem = function PeaceAmbassedorListItem(props: PeaceAmbassedorListItemProps) {
  const { style } = props
  const { onNavigate, item, ...rest } = props

  const { isPressed, pressableProps } = useIsPressed()

  const { ...resolvedNavigateProps } = usePropsResolution('Button', { onPress: onNavigate, variant: 'ghost', ...rest, }, { isPressed, isDisabled: onNavigate === undefined })

  return (
    <Card borderLeftWidth={6} borderLeftColor='primary.500'>
      <Pressable accessibilityRole="button"  {...resolvedNavigateProps} {...pressableProps} >
        <HStack>
          <VStack flex='1' space={2}>
            <Text fontWeight={'bold'}>{item.name}</Text>
            <Text>{(item.province ? item.province + ", " : "") + item.district}</Text>
            <Text>{DateUtils.formatToShortDate(item.date)}</Text>
          </VStack>
          <Avatar >{item.numberOfActiveMembers}</Avatar>
        </HStack>
      </Pressable>
    </Card>
  )
}