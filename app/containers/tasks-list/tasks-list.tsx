import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { BaseList } from "components/base-list/base-list"
import { TaskListItem } from "components/task-list-item/task-list-item"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { compose } from "recompose"
import { ITaskItem, listAllTasks } from "storage/queries/task"

export interface TasksListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  itemsLabel: string
  queryText?: string
  items: ITaskItem[]
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
const Container = observer(function TasksList(props: TasksListProps) {
  const { style } = props

  return (
    <BaseList data={props.items} renderItem={({ item }) => <TaskListItem label={props.itemsLabel} task={item} />} />

  )
})


// export const TasksListContainer = compose(withDatabase, withObservables(['database', 'queryText'], ({ database, queryText }) => ({ items: listAllTasks(database, queryText) })))(Container)
export const TasksListContainer = compose(withDatabase, withObservables(['database', 'queryText'], ({ database, queryText }) => ({ items: listAllTasks(database, queryText) })))(Container)