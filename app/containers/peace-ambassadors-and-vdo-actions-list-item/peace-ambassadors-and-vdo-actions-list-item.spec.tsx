import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { PeaceAmbassadorsAndVdoActionsListItemContainer } from "./peace-ambassadors-and-vdo-actions-list-item"

describe("<PeaceAmbassadorsAndVdoActionsListItemContainer>",()=>{
 it("render", async function () {
    const component = <PeaceAmbassadorsAndVdoActionsListItemContainer></PeaceAmbassadorsAndVdoActionsListItemContainer>
    
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
  