import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { MiniFormModalContainer } from "./mini-form-modal"

describe("<MiniFormModalContainer>",()=>{
 it("render", async function () {
    const {toJSON} = render(<MiniFormModalContainer></MiniFormModalContainer>)
    
    expect(toJSON()).toMatchSnapshot()
  })
})
  