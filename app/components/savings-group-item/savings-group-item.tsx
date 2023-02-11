import { BaseListItem } from "components/base-list-item/base-list-item"
import { Card } from "components/card/card"
import { useIsPressed } from "components/hooks"
import { Text } from "components/text/text"
import { Avatar, HStack, Pressable, usePropsResolution, VStack } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { ISavingsGroup } from "storage/queries/savings-group"
import { SavingsGroupItemStyles as styles } from "./savings-group-item.styles"

export interface SavingsGroupItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: ISavingsGroup
  onPress: ()=> void
}

/**
 * Describe your component here
 */
export const SavingsGroupItem = function SavingsGroupItem(props: SavingsGroupItemProps) {
  const { item } = props


  return (
    <BaseListItem onPress={props.onPress}>
      <HStack >
        <VStack space={2} flex='1'>

          <Text fontWeight={'bold'}>{item.name}</Text>
          <Text >{item.location}</Text>
          <HStack>

            <Text tx="savings-group.z_cycle-duration" />
            <Text>{item.cycleDuration === 0 ? "0" : item.cycleDuration}</Text>
          </HStack>
          <HStack>
            <Text>{item.numberOfCycles === 0 ? "0" : item.numberOfCycles}</Text>
            <Text tx="savings-group.z_number-of-cycles" />
          </HStack>
        </VStack>
        <Avatar color={'warning.500'}>{item.numberOfMembers === 0 ? "0" : item.numberOfMembers}</Avatar>
      </HStack>

    </BaseListItem>
  )
}
