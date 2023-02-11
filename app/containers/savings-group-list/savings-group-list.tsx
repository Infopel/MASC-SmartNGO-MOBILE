import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { BaseList } from "components/base-list/base-list"
import { SavingsGroupItem } from "components/savings-group-item/savings-group-item"
import { observer } from "mobx-react-lite"
import { FlatList, IBoxProps } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { findAllSavingsGroups, ISavingsGroup } from "storage/queries/savings-group"

export interface SavingsGroupListProps extends IBoxProps {
  items: ISavingsGroup[]
}

/**
 * Describe your component here
 */
export const Container = observer(function SavingsGroupList(props: SavingsGroupListProps) {
  const { items, ...rest } = props
  const handleOnPress = (id: string) => {
    navigate('savings-group-details', { id})
  }
  return (
    <BaseList data={items} renderItem={({ item }) => <SavingsGroupItem onPress={handleOnPress.bind(this,item.id)} item={item} />} />
  )
})


export const SavingsGroupListContainer = withDatabase(withObservables(['database'], ({ database }) => ({ items: findAllSavingsGroups(database) }))(Container))