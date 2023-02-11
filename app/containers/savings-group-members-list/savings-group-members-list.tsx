import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { BaseList } from "components/base-list/base-list"
import { Icon } from "components/icon/icon"
import { SavingsGroupMembersItem } from "components/savings-group-members-item/savings-group-members-item"
import { MiniFormModalContainer } from "containers/mini-form-modal/mini-form-modal"
import { translate } from "i18n/translate"
import { observer } from "mobx-react-lite"
import { Fab, useDisclose, VStack } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { ISavingsGroupMemberItem, listAllParticipantsFromSavingsGroup } from "storage/queries/savings-group"
import { IFormType } from "store/form"

export interface SavingsGroupMembersListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  savingsGroupId: string
  items: ISavingsGroupMemberItem[]
}

/**
 * Describe your component here
 */
export const Container = observer(function SavingsGroupMembersList(props: SavingsGroupMembersListProps) {
  const { style, items, savingsGroupId } = props

  const [formData, setFormData] = React.useState<{ formId: IFormType, contextId: string }>()
  const { isOpen, onClose, onOpen } = useDisclose()

  const handleOpenMonitoringForm = (item: ISavingsGroupMemberItem) => {
    setFormData({ formId: 'savings-group-member-monitoring', contextId: item.id })
    onOpen()
  }
  
  const handleOpenGiveUpForm = (item: ISavingsGroupMemberItem) => {
    setFormData({ formId: 'savings-group-member-quitting', contextId: item.id })
    onOpen()
  }


  return (
    <>
      <VStack flex='1'>
        <BaseList
          data={items}
          renderItem={({ item }) => <SavingsGroupMembersItem
            handleOpenMonitoringForm={handleOpenMonitoringForm.bind(this, item)}
            handleOpenGiveUpForm={handleOpenGiveUpForm.bind(this, item)} item={item} />} />
        <Fab
          renderInPortal={false}
          leftIcon={<Icon
            name='add-circle'
            size={'xl'} />}
          label={translate('savings-group-details-members-tab.add-member')} onPress={() => navigate('form', { formId: 'savings-group-member', contextId: savingsGroupId, parentContextId: savingsGroupId})} />
      </VStack>
      {formData && <MiniFormModalContainer {...{ isOpen, onClose, ...formData }} />}
    </>
  )
})

export const SavingsGroupMembersListContainer = withDatabase(withObservables(['database', "savingsGroupId"], ({ database, savingsGroupId }) => ({ items: listAllParticipantsFromSavingsGroup(database, savingsGroupId) }))(Container))
