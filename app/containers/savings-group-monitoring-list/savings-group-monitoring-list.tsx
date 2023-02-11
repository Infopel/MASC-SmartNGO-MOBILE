import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { Icon } from "components/icon/icon"
import { SavingsGroupMonitoringItem } from "components/savings-group-monitoring-item/savings-group-monitoring-item"
import { translate } from "i18n/translate"
import { observer } from "mobx-react-lite"
import { Fab, FlatList, VStack } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { ISavingsGroupMonitoringItem, listAllSavingsGroupMonitoring } from "storage/queries/savings-group"

export interface SavingsGroupMonitoringListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  savingsGroupId: string
  style?: StyleProp<ViewStyle>
  items: ISavingsGroupMonitoringItem[]
}

/**
 * Describe your component here
 */
const Container = observer(function SavingsGroupMonitoringList(props: SavingsGroupMonitoringListProps) {
  const {  items, savingsGroupId } = props

  return (
    <VStack flex='1'>
      <FlatList data={items} renderItem={({ item }) => <SavingsGroupMonitoringItem item={item} />} />
      <Fab renderInPortal={false} leftIcon={<Icon name='add-circle' size={'xl'} />} label={translate('savings-group-details-monitoring-tab.add-monitoring')} onPress={() => navigate('form', { formId: 'savings-group-monitoring', contextId: savingsGroupId, parentContextId: savingsGroupId })} />
    </VStack>
  )
})

export const SavingsGroupMonitoringListContainer = withDatabase(withObservables(['database', "savingsGroupId"], ({ database, savingsGroupId }) => ({ items: listAllSavingsGroupMonitoring(database, savingsGroupId) }))(Container))
