import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { ActionPlanListItemContainer } from "./action-plan-list-item"

describe("<ActionPlanListItemContainer>",()=>{
 it("render", async function () {
    const {toJSON} = render(<ActionPlanListItemContainer></ActionPlanListItemContainer>)
    
    expect(toJSON()).toMatchSnapshot()
  })
})
  