import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { SavingsGroupToolbar } from "./savings-group-toolbar"



describe("<SavingsGroupToolbar>",()=>{
  it("render", async function () {
    const component = <SavingsGroupToolbar></SavingsGroupToolbar>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
