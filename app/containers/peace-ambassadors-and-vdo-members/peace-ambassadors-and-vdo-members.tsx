import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { PeaceAmbassadorsAndVdoMembersListItem } from "components/peace-ambassadors-and-vdo-members-list-item/peace-ambassadors-and-vdo-members-list-item"
import { translate } from "i18n/translate"
import { Divider, Fab, FlatList, VStack } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { findAllParticipantsFromInitiative, IPeaceEmbassadorVDOMember } from "storage/queries/initiative"
import { PeaceAmbassadorsAndVdoMembersStyles as styles } from "./peace-ambassadors-and-vdo-members.styles"

export interface PeaceAmbassadorsAndVdoMembersProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  items: IPeaceEmbassadorVDOMember[]
  initiativeId: string
}

/**
 * Describe your component here
 */
export const Container = (function PeaceAmbassadorsAndVdoMembers(props: PeaceAmbassadorsAndVdoMembersProps) {
  const { style, items, initiativeId } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  return (
    <VStack flex='1'>
      <FlatList ItemSeparatorComponent={() => <Divider mb='2' />} data={items} renderItem={({ item }) => <PeaceAmbassadorsAndVdoMembersListItem item={item} />} />
      <Fab renderInPortal={false} label={(translate('peace-ambassadors-and-vdo-details.add-member'))} onPress={() => navigate('form', { formId: 'pa-or-vdo-member', contextId: initiativeId })} />
    </VStack>
  )
})
export const PeaceAmbassadorsAndVdoMembersContainer = withDatabase(withObservables(['database', "initiativeId"], ({ database, initiativeId }) => ({ items: findAllParticipantsFromInitiative(database, initiativeId) }))(Container))