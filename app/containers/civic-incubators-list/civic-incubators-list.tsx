import withObservables from '@nozbe/with-observables'
import { CivicIncubatorsListItem } from "components/civic-incubators-list-item/civic-incubators-list-item"
import { Placeholder } from "components/placeholder/placeholder"
import { observer } from "mobx-react-lite"
import { FlatList } from "native-base"
import { navigate } from 'navigators/navigation-utilities'
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { findAllInitiatives, ICivicIncubator } from "storage/queries/initiative"
import { deleteInitiative } from "storage/mutations/initiative.mutations"
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'

export interface CivicIncubatorsListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  incubators: ICivicIncubator[]
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
const Container = observer(function CivicIncubatorsList(props: CivicIncubatorsListProps) {
  const { style, incubators } = props
  return (
    <FlatList data={incubators} ListEmptyComponent={() => <Placeholder />} renderItem={({ item }) => <CivicIncubatorsListItem onNavigate={() => navigate('civic-incubator-details', { incubatorId: item.id })} item={item} onRemove={() => deleteInitiative(item.id)} />} />
  )
})



export const CivicIncubatorsListContainer = withDatabase(withObservables(['database'], ({ database }) => ({ incubators: findAllInitiatives(database, 'civic-incubator') }))(Container))