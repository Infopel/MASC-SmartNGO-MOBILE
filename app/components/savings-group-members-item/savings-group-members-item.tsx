import { BaseListItem } from "components/base-list-item/base-list-item"
import { Button } from "components/button/button"
import { Text } from "components/text/text"
import { HStack, VStack, Button as NBButton } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { ISavingsGroupMemberItem } from "storage/queries/savings-group"
import { DateUtils } from "utils/DateUitls"

export interface SavingsGroupMembersItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: ISavingsGroupMemberItem
  handleOpenMonitoringForm: () => void
  handleOpenGiveUpForm: () => void
}

/**
 * Describe your component here
 */
export const SavingsGroupMembersItem = function SavingsGroupMembersItem(props: SavingsGroupMembersItemProps) {
  const { item,handleOpenGiveUpForm,handleOpenMonitoringForm } = props

  return (
    <BaseListItem p={2}>
      <VStack space={2}>
        <HStack space={2}>
          <VStack flex={1} space={2}>
            <Text fontWeight={'bold'}>{item.name}</Text>
            <Text>{item.age} anos</Text>
            <Text>{DateUtils.prettyDate(item.lastMonitoredAt)}</Text>
          </VStack>
          <VStack space={2}>
            <Text fontWeight={'bold'}>Poupança: {item.savings}</Text>
            <Text>Empréstimo: {item.loan} </Text>
          </VStack>
        </HStack>
        <NBButton.Group justifyContent={'flex-end'}>
          <Button onPress={handleOpenMonitoringForm} tx='savings-group-details-members-tab.monitoring'/>
          <Button variant={'outline'} onPress={handleOpenGiveUpForm} tx='savings-group-details-members-tab.quitting'/>
        </NBButton.Group>
      </VStack>
    </BaseListItem>
  )
}
