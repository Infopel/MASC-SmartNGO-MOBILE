import { Q } from "@nozbe/watermelondb"
import Database from "@nozbe/watermelondb/Database"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { FormControlSeletor, FormControlSeletorProps, Item } from "components/form-control-seletor/form-control-seletor"
import { useFormikContext } from "formik"
import * as React from "react"
import { of } from 'rxjs'
import { Location } from "storage/models"
import { Cycle } from "storage/models/cycle"
import { ISelectorDBQuery, useFormStore } from "store/form"

type FormControlSeletorQuery = {
  items: Item[] | ISelectorDBQuery
  fromQueryId: ISelectorDBQuery | undefined
  database: Database
}

export interface FormControlSeletorContainerProps extends Omit<FormControlSeletorProps, 'items'>, FormControlSeletorQuery {
  queryItems: Item[]
}

/**
 * Describe your component here
 */
export function Container(props: FormControlSeletorContainerProps) {
  const { items: _i, queryItems, ...rest } = props

  const items = Array.isArray(_i) ? _i : queryItems

  return (
    <FormControlSeletor items={items} {...rest} />
  )
}

const FormControlSelectorItemsQuery = withDatabase(withObservables(['items', 'fromQueryId'], ({ database, items, fromQueryId }: FormControlSeletorQuery) => {
  let i
  console.log({
    items, fromQueryId
  })
  if (Array.isArray(items)) {
    i = of(items)
  }
  else if (items === 'PROVINCE') {
    i = database.get<Location>(Location.table).query(Q.where('idPai', Q.eq(null)))
  }
  else if (items === 'DISTRICT') {
    const q = fromQueryId ? [Q.where('idPai', fromQueryId)] : [Q.where('idPai', Q.notEq(null))]
    i = database.get<Location>(Location.table).query(...q)
  }

  else if (items === 'CYCLE' && fromQueryId) {
    i = database.get<Cycle>(Cycle.table).query(Q.where('idGrupoPoupanca', fromQueryId))
  }

  else { i = of([]) }


  return ({ queryItems: i })
})(Container))

function FormikFieldWapper(props: FormControlSeletorContainerProps) {
  var formik = useFormikContext<Record<string, string>>();

  const { contextId, parentContextId } = useFormStore(({ contextId, parentContextId }) => ({ contextId, parentContextId }))
  const query = getQuery(Array.isArray(props.items) ? undefined : props.items, formik.values, parentContextId)
  console.log("Query", {query, contextId, parentContextId})
  
  return <FormControlSelectorItemsQuery {...props} fromQueryId={query} />
}

function getQuery(queryType: ISelectorDBQuery | undefined, formikValues: Record<string, string>, parentQueryId?: string) {
  if (queryType === 'CYCLE') {
    return parentQueryId
  }
  else {
    return queryType ? formikValues[queryType] : undefined
  }

}

export const FormControlSeletorContainer = FormikFieldWapper