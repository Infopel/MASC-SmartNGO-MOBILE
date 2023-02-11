import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { BaseListItem } from "./base-list-item"



describe("<BaseListItem>",()=>{
  it("render", async function () {
    const component = <BaseListItem></BaseListItem>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
