import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { FormControlSeletorContainer } from "./form-control-seletor"

describe("<FormControlSeletorContainer>",()=>{
 it("render", async function () {
    const {toJSON} = render(<FormControlSeletorContainer></FormControlSeletorContainer>)
    
    expect(toJSON()).toMatchSnapshot()
  })
})
  