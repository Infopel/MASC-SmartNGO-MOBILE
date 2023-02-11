import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { ActionPlanListContainer } from "./action-plan-list"

describe("<ActionPlanListContainer>",()=>{
 it("render", async function () {
    const {toJSON} = render(<ActionPlanListContainer></ActionPlanListContainer>)
    
    expect(toJSON()).toMatchSnapshot()
  })
})
  