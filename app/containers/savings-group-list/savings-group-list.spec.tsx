import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { SavingsGroupListContainer } from "./savings-group-list"

describe("<SavingsGroupListContainer>",()=>{
 it("render", async function () {
    const component = <SavingsGroupListContainer></SavingsGroupListContainer>
    
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
  