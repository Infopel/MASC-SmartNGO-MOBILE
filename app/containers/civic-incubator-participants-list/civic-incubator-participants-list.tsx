import { Database } from "@nozbe/watermelondb"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { BaseList } from "components/base-list/base-list"
import { CivicIncubatorParticipantsListItem } from "components/civic-incubator-participants-list-item/civic-incubator-participants-list-item"
import { IBoxProps } from "native-base"
import * as React from "react"
import { findAllParticipantsFromInitiative, ICivicIncubatorParticipant } from "storage/queries/initiative"
export interface CivicIncubatorParticipantsListQuery extends IBoxProps {
  searchText?: string
  database: Database
  items: ICivicIncubatorParticipant[]
  incubatorId: string
}
export interface CivicIncubatorParticipantsListProps extends Omit<CivicIncubatorParticipantsListQuery, 'database' | 'searchText' | 'incubatorId'>, IBoxProps {

}

/**
 * Describe your component here
 */
function _CivicIncubatorParticipantsListContainer(props: CivicIncubatorParticipantsListProps) {
  const { items, ...rest } = props

  return (
    <BaseList {...rest} renderItem={({ item }) => <CivicIncubatorParticipantsListItem item={item} />} data={items}  />
  )
}

export const CivicIncubatorParticipantsListContainer = withDatabase(withObservables(['database', 'incubatorId', 'searchText'], ({ database, incubatorId, searchText }: CivicIncubatorParticipantsListQuery) => ({
  items: findAllParticipantsFromInitiative(database, incubatorId, searchText)
}))(_CivicIncubatorParticipantsListContainer))



