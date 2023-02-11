import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { SyncError } from "./sync-error"



describe("<SyncError>",()=>{
  it("render", async function () {
    const component = <SyncError></SyncError>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
