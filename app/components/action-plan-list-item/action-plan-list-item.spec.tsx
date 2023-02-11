import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { ActionPlanListItem } from "./action-plan-list-item"



describe("<ActionPlanListItem>",()=>{
  it("render", async function () {
    const component = <ActionPlanListItem></ActionPlanListItem>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
