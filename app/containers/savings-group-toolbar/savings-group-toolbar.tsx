import Database from "@nozbe/watermelondb/Database"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { SavingsGroupToolbar } from "components/savings-group-toolbar/savings-group-toolbar"
import { IBoxProps } from "native-base"
import { PrimaryStackHeaderProps } from "navigators/navigators"
import * as React from "react"

import { getSavingsGroup as getSavingsGroupById, ISavingsGroup } from "storage/queries/savings-group"

interface SavingsGroupToolbarDatabaseQuery extends PrimaryStackHeaderProps<'savings-group-details'> {
  database: Database
}

export interface SavingsGroupToolbarProps extends IBoxProps, SavingsGroupToolbarDatabaseQuery {
  savingsGroup: ISavingsGroup
}


/**
 * Describe your component here
 */
const Container = ((props: SavingsGroupToolbarProps) => {

  return (
    <SavingsGroupToolbar savingsGroup={props.savingsGroup} />
  )
})

export const SavingsGroupToolbarContainer = withDatabase(withObservables(['route', 'database'], ({ database, route: { params: { id } } }: SavingsGroupToolbarDatabaseQuery) => ({ savingsGroup: getSavingsGroupById(database, id) }))(Container))
