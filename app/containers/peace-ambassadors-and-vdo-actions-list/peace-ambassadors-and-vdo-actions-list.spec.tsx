import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { PeaceAmbassadorsAndVdoActionsListContainer } from "./peace-ambassadors-and-vdo-actions-list"

describe("<PeaceAmbassadorsAndVdoActionsListContainer>",()=>{
 it("render", async function () {
    const component = <PeaceAmbassadorsAndVdoActionsListContainer></PeaceAmbassadorsAndVdoActionsListContainer>
    
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
  