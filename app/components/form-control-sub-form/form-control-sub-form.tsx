import { SubformBody } from "components/form-body/sub-form-body"
import { Heading } from "components/heading/heading"
import { useField } from "formik"
import { TxKeyPath } from "i18n/i18n"
import { translate } from "i18n/translate"
import { isNil } from "lodash"
import { ChevronDownIcon, FormControl, HStack, IBoxProps, IconButton, PresenceTransition, useDisclose, useLayout, VStack } from "native-base"
import * as React from "react"
import { LayoutChangeEvent } from "react-native"
import { useFormStore } from "store/form"
import { SubformPreview } from "./sub-form.preview"

export interface FormControlSubFormProps extends IBoxProps {
  label: TxKeyPath
  fieldName: string
  setScrollTo: (y: number) => void
}


/**
 * Describe your component here
 */
export function FormControlSubForm({ setScrollTo, label, fieldName, ...rest }: FormControlSubFormProps) {


  const { isOpen, onToggle } = useDisclose(false)
  const { onLayout, layout } = useLayout()

  function handleToggle() {
    setScrollTo(layout.height + 200)
    onToggle()
  }


  return (
    <VStack bg='contrastThreshold' {...rest} px='2' py='1' space='2' borderRadius='md'>
      <SubformHeaderAnimations {...{ handleToggle, isOpen, label, fieldName, onToggle }} />
      <SubformFieldsAnimations {...{ fieldName, isOpen, onFieldsLayout: onLayout }} />
    </VStack>
  )
}


interface SubformFieldsAnimationsProps {
  isOpen: boolean
  fieldName: string
  onFieldsLayout: ((event: LayoutChangeEvent) => void) | undefined;
}
function SubformFieldsAnimations({ isOpen, fieldName, onFieldsLayout }: SubformFieldsAnimationsProps) {
  const { fields } = useFormStore(({ getSubformFields }) => ({ fields: getSubformFields(fieldName) }))

  const [selectFieldOutput, setSelectedFieldOutput] = React.useState(0)
  const _handleSubmitSubform = () => {
    setSelectedFieldOutput((index) => index + 1)
  }

  return (
    <>

      <SubformPreview selectedIndex={selectFieldOutput} onSelectIndex={setSelectedFieldOutput} fieldName={fieldName} labelFieldName={fields[0].id} />
      <PresenceTransition visible={isOpen} initial={{
        opacity: 0,

        translateY: -50,
      }} animate={{
        translateY: 0,
        opacity: 1,
        transition: {
          duration: 250
        }
      }}>

        {isOpen && <SubformBody onLayout={onFieldsLayout} index={selectFieldOutput} fieldName={fieldName} fields={fields ?? []} submitForm={_handleSubmitSubform} />
        }</PresenceTransition>
    </>
  )

}

interface SubformHeaderAnimationsProps {
  isOpen: boolean
  label: TxKeyPath
  fieldName: string
  onToggle: () => void
  handleToggle: () => void
}
function SubformHeaderAnimations({ isOpen, label, onToggle, handleToggle, fieldName }: SubformHeaderAnimationsProps) {
  const [{ }, { error }] = useField<Record<string,string>[]>(fieldName)
  
  return (
    <FormControl isInvalid={!isNil(error)}>
      <HStack justifyContent={'space-between'} alignItems='center'>

        <Heading fontWeight={'md'} color='text.600' fontSize='lg'>{translate(label)}</Heading>
        {isOpen && <PresenceTransition visible={isOpen} initial={{
          opacity: 0,
          rotate: `0deg`,
        }} animate={{
          rotate: `180deg`,
          opacity: 1,
          transition: {
            duration: 250
          }
        }}>

          <IconButton icon={<ChevronDownIcon />}
            onPress={onToggle} />
        </PresenceTransition>
        }{!isOpen && <PresenceTransition visible={!isOpen} initial={{
          opacity: 0,
          rotate: `180deg`,

        }} animate={{
          opacity: 1,
          rotate: `360deg`,
          transition: {
            duration: 250
          }
        }}>

          <IconButton icon={<ChevronDownIcon />}
            onPress={handleToggle} />
        </PresenceTransition>}
      </HStack>
      {error && typeof error === 'string' && <FormControl.ErrorMessage>{(error)}</FormControl.ErrorMessage>}
    </FormControl>
  )
}