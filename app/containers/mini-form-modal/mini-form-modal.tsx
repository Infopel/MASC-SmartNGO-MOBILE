import { FormBody } from "components/form-body/form-body"
import { Heading } from "components/heading/heading"
import { Actionsheet, AlertDialog, HStack } from "native-base"
import { PrimaryNavigatorParamList } from "navigators/navigators.d"
import * as React from "react"
import { useFormStore } from "store/form/form.store"

export type MiniFormModalProps = PrimaryNavigatorParamList['form'] & {
  isOpen: boolean
  onClose: () => void
}

/**
 * Describe your component here
 */
export function MiniFormModalContainer(props: MiniFormModalProps) {
  const { formId, contextId, parentContextId, isOpen = false, onClose } = props

  const { fields, requestForm, isFirstPage, nextPage, isLastPage, prevPage, clear, submitForm, pageInfo } = useFormStore(({ fields, requestForm, page, nextPage, isLastPage, isFirstPage, prevPage, clear, submitForm }) => ({ submitForm, fields, clear, nextPage, isFirstPage: isFirstPage(), isLastPage: isLastPage(), prevPage, pageInfo: page(), requestForm }))

  React.useEffect(() => {
    requestForm(formId, contextId, parentContextId)
    return () => clear()
  }, [formId, contextId,parentContextId])

  const handleOnClose = () => {
    clear()
    onClose()
  }


  return (
    <Actionsheet isOpen={isOpen} onClose={handleOnClose}>
      <Actionsheet.Content h='xl'>
        <HStack mb='4' justifyContent='space-between' space='0'>
          <Heading
            w='full'
            numberOfLines={1}
            fontWeight='light'
            m='3'
            tx={pageInfo?.title}
            textBreakStrategy='simple' />
          <AlertDialog.CloseButton onPress={handleOnClose} />
        </HStack>
        <FormBody fields={fields()} {...{ nextPage, prevPage, isLastPage, isFirstPage, submitForm }} />
      </Actionsheet.Content>
    </Actionsheet>
  )
}
