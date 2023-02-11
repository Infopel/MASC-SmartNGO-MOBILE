import { } from '@react-navigation/native/'
import { translate } from 'i18n/translate'
import { PrimaryStackHeaderProps } from "navigators/navigators"
import * as React from "react"
import { render } from "utils/test-utils/test-utils"
import { FormToolbar } from "./form-toolbar"



describe("<FormToolbar>", () => {
  const navProps: PrimaryStackHeaderProps<'form'> = {
    route: {
      key: "simple key",
      name: "form", params: { formId: 'task-diary' },
    },
    layout: {
      height: 100, width: 100,
    },
    navigation: {

    } as any,
    options: {}, progress: {} as any,
    styleInterpolator: {} as any
  }
  it("render", async function () {
    const {toJSON, queryByTestId} =render( <FormToolbar {...navProps} />)

    expect(queryByTestId('back')).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
  })
  
  it("Should render form name without page indicator", ()=> {
    const {queryByText} = render(<FormToolbar {...navProps} />)
    expect(queryByText(translate(`form.${navProps.route.params.formId}.title`))).toBeTruthy()
  })
  
  it("Should render page indicator", ()=> {
    const {queryByText} = render(<FormToolbar {...navProps} pageInfo={{stepCount:4, currentStep:2}} />)
    expect(queryByText("2")).toBeTruthy()
    
  })


})
