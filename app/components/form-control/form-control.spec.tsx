import { Formik } from "formik"
import { TxKeyPath } from "i18n/i18n"
import { translate } from "i18n/translate"
import * as React from "react"
import { View } from "react-native"
import { render } from "utils/test-utils/test-utils"
import { FormControl } from "./form-control"


describe("<FormControl>",()=>{
  it("should render", ()=>{
    const submit = jest.fn()
    const label:TxKeyPath = 'civic-incubators.delete-item-label'
    const {getByTestId, getByText, toJSON} = render(<Formik onSubmit={submit} initialValues={{ control: undefined }}><FormControl {...{ testID:"tatabas",fieldName: 'control', label }}>    <View />
    </FormControl>
    </Formik>)
    expect(getByTestId("tatabas")).toBeTruthy()
    expect(getByText(translate(label))).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
    
  })
  it("should show helperText", ()=>{
    const submit = jest.fn()
    const helperText:TxKeyPath = 'civic-incubator-details.title'
    const label:TxKeyPath = 'civic-incubators.delete-item-label'
    const {getByText, toJSON} = render(<Formik onSubmit={submit} initialValues={{ control: undefined }}><FormControl {...{ testID:"tatabas",fieldName: 'control', helperText, label }}>    <View />
    </FormControl>
    </Formik>)
    
    expect(getByText(translate(helperText))).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
    
  })
  
  it("should show error", ()=> {
    const submit = jest.fn()
    const label = 'civic-incubators.delete-item-label'
    const errorMessage = "this is a error message"
    const {getByText, toJSON} = render(<Formik onSubmit={submit} initialErrors={{
      control:errorMessage
    }} initialValues={{ control: undefined }}><FormControl {...{ testID:"tatabas",fieldName: 'control', label }}>    <View />
    </FormControl>
    </Formik>)

    expect(getByText(errorMessage)).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()

    
    
  })
})


