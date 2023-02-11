import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { FormToolbarContainer } from "./form-toolbar"

describe("<FormToolbarContainer>",()=>{
 it("render", async function () {
    const component = <FormToolbarContainer></FormToolbarContainer>
    
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
  