import { Q } from "@nozbe/watermelondb"
import Database from "@nozbe/watermelondb/Database"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { ActionPlanListItem } from "components/action-plan-list-item/action-plan-list-item"
import { BaseList } from "components/base-list/base-list"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { ActionPlan } from "storage/models/action-plan"

export interface ActionPlanListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  initiativeId: string;
  style?: StyleProp<ViewStyle>
  items: ActionPlan[]
}

/**
 * Describe your component here
 */
function Container(props: ActionPlanListProps) {
  const { style, items } = props

  return (
    <BaseList data={items} renderItem={({ item }) => <ActionPlanListItem item={item} />} />
  )
}

export const ActionPlanListContainer = withDatabase(withObservables(['database', 'initiativeId'], ({ database, initiativeId }) => ({
  items: (database as Database).get<ActionPlan>(ActionPlan.table).query(Q.where('idIniciativa', initiativeId))
}))(Container))