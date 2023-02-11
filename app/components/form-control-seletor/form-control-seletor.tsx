
import { FormControl, FormControlProps } from "components/form-control/form-control"
import { Heading } from "components/heading/heading"
import { useField } from "formik"
import { translate, TxKeyPath } from "i18n"
import { Omit } from "lodash"
import { Select } from "native-base"
import * as React from "react"

export type Item = {
  id: string
  name: string
}

export interface FormControlSeletorProps extends Omit<FormControlProps, 'children'> {
  /**
   * An optional style override useful for padding & margin.
   */
  placeholder?: TxKeyPath
  testID?: string
  items: Item[]
}

/**
 * Describe your component here
 */
export const FormControlSeletor = function FormControlSeletor(props: FormControlSeletorProps) {
  const { placeholder, testID, items, ...rest } = props

  const [{ onBlur, onChange }, { value }] = useField(props.fieldName)

  return (
    <FormControl {...rest}>
      <Select optimized={false} testID={testID} selectedValue={value} onValueChange={onChange(props.fieldName)} placeholder={placeholder ? translate(placeholder) : undefined}>
        <Heading mx='3' fontWeight={'light'} mb='2' tx={props.label} />
        {
          items.map((item) =>
            <Select.Item key={item.id} value={item.id} label={item.name} testID={testID} />
          )
        }
      </Select>
    </FormControl>
  )
}

