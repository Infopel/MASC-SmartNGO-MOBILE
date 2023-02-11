import { FormControl, FormControlProps } from "components/form-control/form-control"
import { useField } from "formik"
import { translate } from "i18n/translate"
import { Radio } from 'native-base'
import * as React from "react"
type IItem = {
  name: string
  id: string
}
export interface FormControlRadioProps extends Omit<FormControlProps, 'children'> {
  items: IItem[]

}

/**
 * Describe your component here
 */
export const FormControlRadio = function FormControlRadio(props: FormControlRadioProps) {
  const { items, ...rest } = props

  const [{ onChange }, { value },] = useField(props.fieldName)

  return (
    <FormControl {...rest}>
      <Radio.Group name={props.fieldName} value={value} space='1' accessibilityLabel={translate(props.label)} onChange={onChange(props.fieldName)}>
        {items.map(({ id, name }) => <Radio key={id} value={id}>{name}</Radio>)}
      </Radio.Group>
    </FormControl>
  )
}
