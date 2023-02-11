import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { Card } from "./card"



describe("<Card>",()=>{
  it("render", async function () {
    const component = <Card></Card>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
