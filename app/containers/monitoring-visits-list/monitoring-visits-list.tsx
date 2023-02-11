import { Q } from "@nozbe/watermelondb"
import Database from "@nozbe/watermelondb/Database"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { BaseList } from "components/base-list/base-list"
import { MonitoringVisitsListItem } from "components/monitoring-visits-list-item/monitoring-visits-list-item"
import * as React from "react"
import { MonitoringVisit } from "storage/models/monitoring-visit"

export interface MonitoringVisitsListProps {
  initiativeId: string
  items?: MonitoringVisit[]
}

/**
 * Describe your component here
 */
 function Container({ items }: MonitoringVisitsListProps) {


  return (
    <BaseList data={items} renderItem={({ item }) => <MonitoringVisitsListItem item={item} />} />
  )
}

export const MonitoringVisitsListContainer = withDatabase(withObservables(['initiativeId','database'], ({ initiativeId, database }: { database: Database; initiativeId: string }) => ({ items: database.get<MonitoringVisit>(MonitoringVisit.table).query(Q.where("idIniciativa", initiativeId)) }))(Container))
