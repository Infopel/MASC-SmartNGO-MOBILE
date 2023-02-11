import { Card } from "components/card/card"
import { useIsPressed } from "components/hooks"
import { Text } from "components/text/text"
import { HStack, Pressable, usePropsResolution, VStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { IPeaceEmbassadorVDOMember } from "storage/queries/initiative"
import { DateUtils } from "utils/DateUitls"

export interface PeaceAmbassadorsAndVdoMembersListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: IPeaceEmbassadorVDOMember
}

/**
 * Describe your component here
 */
export const PeaceAmbassadorsAndVdoMembersListItem = function PeaceAmbassadorsAndVdoMembersListItem(props: PeaceAmbassadorsAndVdoMembersListItemProps) {
  const { style, item, ...rest } = props
  const { isPressed, pressableProps } = useIsPressed()

  const { ...resolvedNavigateProps } = usePropsResolution('Button', { variant: 'ghost', ...rest, }, { isPressed })

  return (
    <Card borderLeftWidth={6} borderLeftColor='primary.500'>
      <Pressable accessibilityRole="button"  {...resolvedNavigateProps} {...pressableProps} >
        <HStack>
          <VStack flex='1' space={2}>
            <Text fontWeight={'bold'} >{item.name}</Text>
            <Text>{item.age} anos</Text>
            <Text>{item.function}</Text>
            {/* <Text>{DateUtils.formatToShortDate(item.date)}</Text> */}
          </VStack>
        </HStack>
      </Pressable>
    </Card>
  )
}
