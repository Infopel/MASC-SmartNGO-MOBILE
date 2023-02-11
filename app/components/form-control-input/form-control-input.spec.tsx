import { Formik } from "formik"
import { translate } from "i18n"
import * as React from "react"
import { fireEvent, render , waitFor} from "utils/test-utils/test-utils"
import { FormControlInput } from "./form-control-input"



describe("<FormControlInput> ", () => {

  it('should render', () => {
    const submit = jest.fn()
    const component = <Formik onSubmit={submit} initialValues={{ text: undefined }}>{({ handleSubmit }) => <><FormControlInput {...{ fieldName: 'text', label: 'civic-incubators.delete-item-label' }} /></>}</Formik>

    const { getByText, getByPlaceholderText } = render(component)

    expect(getByText((translate('civic-incubators.delete-item-label')))).toBeTruthy()
  })
  it('should show placeholder', () => {
    const submit = jest.fn()
    const component = <Formik onSubmit={submit} initialValues={{ text: undefined }}>{({ handleSubmit }) => <><FormControlInput {...{ fieldName: 'text', placeholder: 'civic-incubator-details.title', label: 'civic-incubators.delete-item-label' }} /></>}</Formik>

    const { getByText, getByPlaceholderText } = render(component)

    expect(getByPlaceholderText((translate('civic-incubator-details.title')))).toBeTruthy()
  })

  it('should display initial value', () => {
    const submit = jest.fn()
    const initialValue = "Ola Mundo"
    const component = <Formik onSubmit={submit} initialValues={{ text: initialValue }}>{({ handleSubmit }) => <><FormControlInput {...{ fieldName: 'text', placeholder: 'civic-incubator-details.title', label: 'civic-incubators.delete-item-label' }} /></>}</Formik>

    const { getByDisplayValue } = render(component)
    
    expect(getByDisplayValue(initialValue)).toBeTruthy()
  })
  it('should update value', async () => {
    const submit = jest.fn()
    const newValue = "Great Conversation"
    const component = <Formik onSubmit={submit} initialValues={{ text: undefined }}>{({ handleSubmit }) => <><FormControlInput {...{ testID: "text", fieldName: 'text', placeholder: 'civic-incubator-details.title', label: 'civic-incubators.delete-item-label' }} /></>}</Formik>

    const { debug, getByDisplayValue, getByTestId } = render(component)
    
    fireEvent.changeText(getByTestId('text'), newValue)
    await waitFor(() => {

      expect(getByDisplayValue(newValue)).toBeTruthy()
    })


  })
})

