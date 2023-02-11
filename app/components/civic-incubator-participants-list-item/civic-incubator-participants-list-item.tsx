import { BaseListItem } from "components/base-list-item/base-list-item"
import { Text } from "components/text/text"
import { IBoxProps, VStack } from "native-base"
import * as React from "react"
import { ICivicIncubatorParticipant } from "storage/queries/initiative"

export interface CivicIncubatorParticipantsListItemProps extends IBoxProps {
  item: ICivicIncubatorParticipant
}

/**
 * Describe your component here
 */
export function CivicIncubatorParticipantsListItem({ item, ...rest }: CivicIncubatorParticipantsListItemProps) {

  return (
    <BaseListItem>
      <VStack flex='1' space={2}>
        <Text fontWeight={'bold'}>{item.name}</Text>
        <Text>{item.grade}</Text>
        <Text>{item.age} </Text>
      </VStack>
    </BaseListItem>
  )
}
