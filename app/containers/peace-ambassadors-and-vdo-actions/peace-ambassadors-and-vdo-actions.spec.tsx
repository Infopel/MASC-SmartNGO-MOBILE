import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { PeaceAmbassadorsAndVdoActionsContainer } from "./peace-ambassadors-and-vdo-actions"

describe("<PeaceAmbassadorsAndVdoActionsContainer>",()=>{
 it("render", async function () {
    const component = <PeaceAmbassadorsAndVdoActionsContainer></PeaceAmbassadorsAndVdoActionsContainer>
    
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
  