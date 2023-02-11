import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { Placeholder } from "./placeholder"



describe("<Placeholder>",()=>{
  it("render", async function () {
    const component = <Placeholder></Placeholder>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
