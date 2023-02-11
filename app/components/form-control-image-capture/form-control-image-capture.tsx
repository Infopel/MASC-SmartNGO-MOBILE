import { FormControl, FormControlProps } from "components/form-control/form-control"
import { ImageCapture } from "components/image-capture/image-capture"
import { useField } from "formik"
import { translate } from "i18n/translate"
import * as React from "react"

export interface FormControlImageCaptureProps extends Omit<FormControlProps, 'children'> {

}

/**
 * Describe your component here
 */
export const FormControlImageCapture = function FormControlImageCapture(props: FormControlImageCaptureProps) {
  const { ...rest } = props

  const [{onChange},{value}, {setValue}] = useField<string[]>(props.fieldName)

  const handleOnChange = (images: string[]) => {
    console.log("before ",{images})
    setValue(images)
  }

  return (
    <FormControl {...rest}>
      <ImageCapture title={translate(props.label)} images={value ?? []} onChangeImages={handleOnChange}/>
    </FormControl>
  )
}
