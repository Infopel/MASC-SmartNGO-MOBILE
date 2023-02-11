import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { FormControl, FormControlProps } from "components/form-control/form-control"
import { useIsPressed } from 'components/hooks'
import { Input } from "components/input/input"
import { isValid } from 'date-fns'
import { useField } from "formik"
import { TxKeyPath } from "i18n"
import { Icon, Pressable, usePropsResolution } from 'native-base'
import * as React from "react"
import { DateUtils } from 'utils'

export interface FormControlDateProps extends Omit<FormControlProps, 'children'> {

  testID?: string
  placeholder?: TxKeyPath
}

/**
 * Describe your component here
 */
export const FormControlDate = function FormControlDate(props: FormControlDateProps) {
  const { testID, placeholder, ...rest } = props
  const [{ onBlur, onChange }, { value }] = useField<Date | undefined>(props.fieldName)
  const isValidDate = value && isValid(new Date(value))
  const date = isValidDate ? new Date(value) : new Date()

  function handleOnChange(event: DateTimePickerEvent, date?: Date) {
    if (event.type === 'set' && event.nativeEvent.timestamp) {
      onChange(props.fieldName)(new Date(event.nativeEvent.timestamp).toString())
    }
  }

  const togggleShow = () => {
    DateTimePickerAndroid.open({
      value: date,
      display: 'calendar',
      accessibilityLabel: props.label,
      mode: 'date',
      onChange: handleOnChange
    })
  }
  const { isPressed, pressableProps } = useIsPressed()
  const { ...resolvedProps } = usePropsResolution('Button', {
    variant: 'ghost', onPress: togggleShow
  }, { isPressed })

  return (
    <FormControl {...rest}>
      <Pressable {...resolvedProps} {...pressableProps} paddingBottom={0} paddingLeft={0} paddingRight={0} paddingTop={0} >
        <Input testID={testID} editable={false} focusable txPlaceholder={placeholder ?? 'common.date-placeholder'} value={isValidDate ? DateUtils.formatToShortDate(date) : undefined
        } rightElement={<Icon as={MaterialCommunityIcons} name='calendar-month' mx={3} />} />
      </Pressable>
    </FormControl >
  )
}
