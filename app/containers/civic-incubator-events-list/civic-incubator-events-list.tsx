import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { BaseList } from "components/base-list/base-list"
import { CivicIncubatorEventsListItem } from "components/civic-incubator-events-list-item/civic-incubator-events-list-item"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { Action } from "storage/models/action"
import { findAllEventsFromIncubator } from "storage/queries/initiative"

export interface CivicIncubatorEventsListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  items: Action[]
}

/**
 * Describe your component here
 */
function _CivicIncubatorEventsListContainer(props: CivicIncubatorEventsListProps) {
  const { items, ...rest } = props

  return (
    <BaseList {...rest} renderItem={({ item }) => <CivicIncubatorEventsListItem item={item} />} data={items} />
  )
}

export const CivicIncubatorEventsListContainer = withDatabase(withObservables(['database', 'incubatorId', 'searchText'], ({ database, incubatorId, searchText }: CivicIncubatorEventsListQuery) => ({
  items: findAllEventsFromIncubator(database, incubatorId, searchText)
}))(_CivicIncubatorEventsListContainer))



