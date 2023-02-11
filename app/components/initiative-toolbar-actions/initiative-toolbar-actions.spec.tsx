import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { InitiativeToolbarActions } from "./initiative-toolbar-actions"



describe("<InitiativeToolbarActions>",()=>{
  it("render", async function () {
    const component = <InitiativeToolbarActions></InitiativeToolbarActions>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
