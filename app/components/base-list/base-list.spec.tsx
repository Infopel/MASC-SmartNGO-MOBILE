import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { BaseList } from "./base-list"



describe("<BaseList>",()=>{
  it("render", async function () {
    const component = <BaseList></BaseList>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
