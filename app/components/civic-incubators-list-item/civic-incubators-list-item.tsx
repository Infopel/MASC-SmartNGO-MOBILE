import { Card } from "components/card/card"
import { useIsPressed } from "components/hooks"
import { Icon } from "components/icon/icon"
import { Text } from "components/text/text"
import { translate } from "i18n"
import { HStack, IBoxProps, IconButton, Pressable, usePropsResolution, VStack } from "native-base"
import * as React from "react"
import { ICivicIncubator } from "storage/queries/initiative"
import { DateUtils } from "utils/DateUitls"
import { TextUtils } from "utils/TextUtils"

export interface CivicIncubatorsListItemProps extends IBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  item: ICivicIncubator
  onNavigate: () => void
  onRemove: () => void
}

/**
 * Describe your component here
 */
export const CivicIncubatorsListItem = function CivicIncubatorsListItem(props: CivicIncubatorsListItemProps) {
  const { onNavigate, onRemove, item, ...rest } = props

  const { isPressed, pressableProps } = useIsPressed()

  const { ...resolvedNavigateProps } = usePropsResolution('Button', { onPress: onNavigate, variant: 'ghost', ...rest, }, { isPressed })

  const location = TextUtils.getIncubatorLocation(item.province, item.district)

  return (
    <Card borderLeftWidth={6} borderLeftColor='primary.500'>
      <Pressable testID="civic-incubator-item" accessibilityRole="button"  {...resolvedNavigateProps} {...pressableProps} >
        <HStack>
          <VStack flex='1' space={2}>
            <Text fontWeight={'bold'} accessibilityLabel={translate('civic-incubators.item-label')}>{item.name}</Text>
            <Text>{location}</Text>
            <Text>{DateUtils.formatToShortDate(item.date)}</Text>
          </VStack>
          <IconButton testID='remove-paticipant' icon={<Icon name='trash-can' type='material-community' size='xl' />} colorScheme='danger' onPress={onRemove} accessibilityRole="imagebutton" accessibilityLabel={translate('civic-incubators.delete-item-label')} />
        </HStack>
      </Pressable>
    </Card>
  )
}
