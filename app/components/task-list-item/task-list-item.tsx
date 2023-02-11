import { BaseListItem } from "components/base-list-item/base-list-item"
import { useIsPressed } from "components/hooks"
import { Icon } from "components/icon/icon"
import { Text } from "components/text/text"
import { HStack, Pressable, usePropsResolution, VStack } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { ITaskItem } from "storage/queries/task"
import { DateUtils } from "utils/DateUitls"

export interface TaskListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  label: string
  task: ITaskItem
}

/**
 * Describe your component here
 */
export const TaskListItem = function TaskListItem(props: TaskListItemProps) {


  return (
    <BaseListItem onPress={navigate.bind(this, 'form', { formId: 'task-diary', contextId: props.task.id })}>
      <HStack alignItems={'center'}>
        <VStack space={2} flex='1'>
          <Text fontWeight={'bold'}>{props.task.name}</Text>
          <Text accessibilityLabel={props.label}>{DateUtils.formatToShortDate(props.task.date)}</Text>
          <Text accessibilityLabel={props.label}>{props.task.location}</Text>
        </VStack>
        <Icon size='lg' name={props.task.isPending ? 'timer-sand' : 'timer-sand-full'} type='material-community' />
      </HStack>
    </BaseListItem>
  )
}
