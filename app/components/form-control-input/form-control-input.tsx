import { FormControl, FormControlProps } from "components/form-control/form-control"
import { Input } from "components/input/input"
import { TxKeyPath } from "i18n"

import { useField } from "formik"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { ITextValidation } from "store/form"

export interface FormControlInputProps extends Omit<FormControlProps, 'children'> {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  placeholder?: TxKeyPath
  testID?: string
  validation?: ITextValidation


}

/**
 * Describe your component here
 */
export const FormControlInput = function FormControlInput(props: FormControlInputProps) {
  const { placeholder, testID, validation, ...rest } = props
  const fieldName = props.fieldName

  const [{ onBlur, onChange, }, { value }, helpers] = useField(fieldName)

  return (
    <FormControl {...rest}>
      <Input
        testID={testID}
        txPlaceholder={placeholder}
        numberOfLines={validation?.contentType === 'long-text' ? 5 : 1}
        keyboardType={validation?.contentType === 'number-positive' ? 'number-pad' : validation?.contentType === 'decimal-positive' ? 'decimal-pad' : 'default'}
        value={value} onBlur={onBlur(fieldName)}
        onChangeText={onChange(fieldName)} />
    </FormControl>
  )
}
