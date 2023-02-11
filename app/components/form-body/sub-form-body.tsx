import { Button } from "components/button/button"
import { FlatList, IStackProps, View, VStack } from "native-base"
import * as React from "react"
import { IField } from "store/form"
import { FieldMapper } from "./FieldMapper"


export interface SubformBodyProps extends IStackProps {
  submitForm: () => void
  fields: IField[]
  index: number
  fieldName: string
}

/**
 * Describe your component here
 */
export function SubformBody (props: SubformBodyProps) {
  const { style,fieldName, fields, submitForm, index, ...rest } = props

  const handleSubmit = async () => {
    submitForm()
  }
  return (
    <VStack {...rest} flex='1'>
      <VStack space='2' flex='1'>
        <FlatList data={fields.map((x) => ({ ...x, id: `${fieldName}[${index}]${x.id}` }))}
          flex='1'
          ItemSeparatorComponent={() => <View mb='2' />} keyExtractor={(item) => item.id} renderItem={({ item }) => <FieldMapper ignoreSubform field={item} />} />
        <Button onPress={handleSubmit} flex='1' tx={'form.submit'} />
      </VStack>

    </VStack>
  )
}
