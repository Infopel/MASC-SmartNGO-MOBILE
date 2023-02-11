import { Button } from "components/button/button"
import { Formik, FormikHelpers } from "formik"
import { TxKeyPath } from "i18n/i18n"
import { translate } from "i18n/translate"
import { Box, Button as NBbtn, FlatList, IStackProps, Text, View, VStack } from "native-base"
import { goBack } from "navigators/navigation-utilities"
import * as React from "react"
import { FlatList as FL, NativeScrollEvent, NativeSyntheticEvent } from "react-native"
import { IField } from "store/form"
import { FieldMapper } from "./FieldMapper"
import { generateValidationSchema } from "./validations"


export interface FormBodyProps extends IStackProps {
  isLastPage?: boolean
  isFirstPage?: boolean
  isMultiPage: boolean
  prevPage?: () => void
  submitForm: (data: any) => TxKeyPath | undefined
  nextPage?: () => void
  fields: IField[]
}

/**
 * Describe your component here
 */
export const FormBody = function (props: FormBodyProps) {
  const { style, fields, isFirstPage, submitForm, isMultiPage,isLastPage = true, prevPage, nextPage, ...rest } = props
  const [error, setError] = React.useState<TxKeyPath>()
  const [scrollPosition, setScrollPosition] = React.useState<number>(0)
  const listRef = React.useRef<FL>(null)
  const initialValues = fields.reduce((acc, { id }) => { acc[id] = undefined; return acc }, {} as any)
  const handleOnSubmit = async (values: any, helper: FormikHelpers<any>) => {
    setError(undefined)
    console.log({ values })
    if(isLastPage){
      const response = await submitForm(values)
      console.log({ response })
      if (!response) {
  
        goBack()
      }
      else {
  
        setError(response)
  
      }
    }else {
      nextPage?.()
    }
  }
  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
     setScrollPosition(event.nativeEvent.contentOffset.y)
  }

  function scrollToPresentSubform(y: number) {
    listRef.current?.scrollToOffset({
      animated: true, offset: scrollPosition+(y),
    })
  }
  

  return (
    <VStack {...rest} flex='1'>
      <Formik initialValues={initialValues} validationSchema={generateValidationSchema(fields)} onSubmit={handleOnSubmit}>
        {({ handleSubmit }) =>
          <VStack space='2' flex='1'>
            {error && <Box bg='contrastThreshold' p='2' borderRadius={4}><Text color='danger.500'>{translate(error)}</Text></Box>}
            <FlatList onScroll={handleOnScroll} ref={listRef} flex='1' ItemSeparatorComponent={() => <View mb='2' />} keyExtractor={(item) => item.id} data={fields} renderItem={({ item }) => <FieldMapper setScrollTo={scrollToPresentSubform} field={item} />} />
            <NBbtn.Group >{isMultiPage ? <Button disabled={isFirstPage} flex='1' tx='form.prev-page' onPress={prevPage} /> : <View />}<Button onPress={handleSubmit} flex='1' tx={isLastPage ? 'form.submit' : 'form.next-page'} /></NBbtn.Group>
          </VStack>
        }
      </Formik>
    </VStack>
  )
}
