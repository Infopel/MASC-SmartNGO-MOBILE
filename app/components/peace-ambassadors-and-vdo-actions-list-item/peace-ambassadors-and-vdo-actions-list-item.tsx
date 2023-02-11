import { Card } from "components/card/card"
import { useIsPressed } from "components/hooks"
import { Icon } from "components/icon/icon"
import { Text } from "components/text/text"
import { HStack, IconButton, Pressable, usePropsResolution, VStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { Action } from "storage/models/action"
import { DateUtils } from "utils/DateUitls"
import { TextUtils } from "utils/TextUtils"

export interface PeaceAmbassadorsAndVdoActionsListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: Action
}

/**
 * Describe your component here
 */
export const PeaceAmbassadorsAndVdoActionsListItem = function PeaceAmbassadorsAndVdoActionsListItem(props: PeaceAmbassadorsAndVdoActionsListItemProps) {
  const { style, item, ...rest } = props
  const { isPressed, pressableProps } = useIsPressed()

console.log("PeaceAmbassadorsAndVdoActionsListItemProps",{item})
  const { ...resolvedNavigateProps } = usePropsResolution('Button', { variant: 'ghost', ...rest, }, { isPressed })

  return (
    <Card borderLeftWidth={6} borderLeftColor='primary.500'>
      <Pressable accessibilityRole="button"  {...resolvedNavigateProps} {...pressableProps} >
        <HStack>
          <VStack flex='1' space={2}>
            <Text fontWeight={'bold'} >{item.name}</Text>
            <Text>Coordenado por: {item._raw.coordenador}</Text>
            <Text>{TextUtils.parseNumber(item._raw.nrParticipantesMulheres) + TextUtils.parseNumber(item._raw.nrParticipantesHomesn)} Membros</Text>
            <Text>{DateUtils.formatToShortDate(item._raw.dataFormacao)}</Text>
          </VStack>
          <IconButton icon={<Icon name='pencil' type='material-community' size='xl' />} accessibilityRole="imagebutton" />
        </HStack>
      </Pressable>
    </Card>)
}
