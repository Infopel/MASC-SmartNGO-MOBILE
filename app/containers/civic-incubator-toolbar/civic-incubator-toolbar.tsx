import Database from "@nozbe/watermelondb/Database"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { CivicIncubatorToolbar } from "components/civic-incubator-toolbar/civic-incubator-toolbar"
import { observer } from "mobx-react-lite"
import { IBoxProps } from "native-base"
import { PrimaryStackHeaderProps } from "navigators/navigators"
import * as React from "react"
import { findInitiativeById, IInitiative } from "storage/queries/initiative"

interface ICivicIncubatorToolbarDatabaseQuery extends PrimaryStackHeaderProps<'civic-incubator-details'> {
  database: Database

}

export interface CivicIncubatorToolbarProps extends IBoxProps, ICivicIncubatorToolbarDatabaseQuery {
  incubator: IInitiative
  incubatorId: string
}

/**
 * Describe your component here
 */
export const _CivicIncubatorToolbarContainer = observer(function ({ incubator }: CivicIncubatorToolbarProps) {

  return (
    <CivicIncubatorToolbar incubator={incubator} />
  )
})


export const CivicIncubatorToolbarContainer = withDatabase(withObservables(['route', 'database'], ({ database, route: { params: { incubatorId } } }: ICivicIncubatorToolbarDatabaseQuery) => ({ incubator: findInitiativeById(incubatorId, database) }))(_CivicIncubatorToolbarContainer))
