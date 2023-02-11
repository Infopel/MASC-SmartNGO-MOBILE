import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { PeaceAmbassadorsAndVdoActionsListItem } from "components/peace-ambassadors-and-vdo-actions-list-item/peace-ambassadors-and-vdo-actions-list-item"
import { translate } from "i18n/translate"
import { observer } from "mobx-react-lite"
import { Divider, Fab, FlatList, VStack } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { findAllEventsFromIncubator, IPeaceEmbassadorVDOAction } from "storage/queries/initiative"
import { PeaceAmbassadorsAndVdoActionsStyles as styles } from "./peace-ambassadors-and-vdo-actions.styles"

export interface PeaceAmbassadorsAndVdoActionsProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  items: IPeaceEmbassadorVDOAction[]
  initiativeId: string
}

/**
 * Describe your component here
 */
const Container = observer(function PeaceAmbassadorsAndVdoActions(props: PeaceAmbassadorsAndVdoActionsProps) {
  const { style, items, initiativeId } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  return (
    <VStack flex='1'>
      <FlatList data={items} ItemSeparatorComponent={() => <Divider mb='2' />} renderItem={({ item }) => <PeaceAmbassadorsAndVdoActionsListItem item={item} />} />
      <Fab renderInPortal={false} label={(translate('peace-ambassadors-and-vdo-details.add-action'))} onPress={() => navigate('form', { formId: 'pa-or-vdo-action', contextId: initiativeId })} />
    </VStack>
  )
})

export const PeaceAmbassadorsAndVdoActionsContainer = withDatabase(withObservables(['database', "initiativeId"], ({ database, initiativeId }) => ({ items: findAllEventsFromIncubator(database, initiativeId) }))(Container))
