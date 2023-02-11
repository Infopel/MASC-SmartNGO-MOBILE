import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { useRoute } from "@react-navigation/native"
import { PeaceAmbassedorListItem } from "components/peace-ambassedor-list-item/peace-ambassedor-list-item"
import { observer } from "mobx-react-lite"
import { Divider, FlatList } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { findAllInitiatives, IPeaceEmbassadorVDO } from "storage/queries/initiative"

export interface PeaceAmbassedorListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  items: IPeaceEmbassadorVDO[]
}

/**
 * Describe your component here
 */
const Container = observer(function PeaceAmbassedorList(props: PeaceAmbassedorListProps) {
  const { style, items } = props


  const params = useRoute().params

  return (
    <FlatList ItemSeparatorComponent={() => <Divider mb='2' />} data={items} renderItem={(({ item }) => <PeaceAmbassedorListItem item={item} onNavigate={() => navigate('peace-ambassadors-and-vdo-details', { incubatorId: item.id, ...params })} />)} />
  )
})

export const PeaceAmbassedorListContainer = withDatabase(withObservables(['database', "type"], ({ database, type }) => ({ items: findAllInitiatives(database, type) }))(Container))