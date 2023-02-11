import * as React from "react"
import { IBoxProps, Box, VStack, Heading } from "native-base"
import { Text } from "components/text/text"
import { Action } from "storage/models/action"
import { BaseListItem } from "components/base-list-item/base-list-item"

export interface CivicIncubatorEventsListItemProps extends IBoxProps {
  item: Action
}

/**
 * Describe your component here
 */
export function CivicIncubatorEventsListItem(props: CivicIncubatorEventsListItemProps) {
  const { item, ...rest } = props
  console.log(props)

  return (
    <BaseListItem {...rest}>
      <VStack>

        <Heading size='sm'>{item.name}</Heading>
        {/* <Text >{type}</Text> */}
        <Text >{item.participants}</Text>
      </VStack>
    </BaseListItem>
  )
}
