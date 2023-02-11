import { translate, TxKeyPath } from "i18n"
import { useField } from "formik"
import { isNil } from "lodash"
import { FormControl as NBFormControl, IBoxProps } from "native-base"
import * as React from "react"


export interface FormControlProps extends IBoxProps {
  children: React.ReactNode
  fieldName: string
  label: TxKeyPath
  helperText?: TxKeyPath
}

/**
 * Describe your component here
 */
export const FormControl = function FormControl(props: FormControlProps) {
  const { children, label, helperText, fieldName, ...rest } = props
  const [field, { error }] = useField(fieldName)

  return (
    <NBFormControl isInvalid={!isNil(error)} {...rest}>
      <NBFormControl.Label>{translate(label)}</NBFormControl.Label>
      {children}
      {helperText && <NBFormControl.HelperText>{translate(helperText)}</NBFormControl.HelperText>}
      <NBFormControl.ErrorMessage>{error}</NBFormControl.ErrorMessage>
    </NBFormControl>
  )
}
