import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { SavingsGroupToolbarContainer } from "./savings-group-toolbar"

describe("<SavingsGroupToolbarContainer>",()=>{
 it("render", async function () {
    const {toJSON} = render(<SavingsGroupToolbarContainer></SavingsGroupToolbarContainer>)
    
    expect(toJSON()).toMatchSnapshot()
  })
})
  