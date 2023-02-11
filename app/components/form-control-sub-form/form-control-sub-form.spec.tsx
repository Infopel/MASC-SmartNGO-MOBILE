import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { FormControlSubForm } from "./form-control-sub-form"



describe("<FormControlSubForm>",()=>{
  it("render", async function () {
    const component = <FormControlSubForm></FormControlSubForm>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
