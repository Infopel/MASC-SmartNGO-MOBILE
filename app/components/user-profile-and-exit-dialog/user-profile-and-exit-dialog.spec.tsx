import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { UserProfileAndExitDialog } from "./user-profile-and-exit-dialog"



describe("<UserProfileAndExitDialog>",()=>{
  it("render", async function () {
    const component = <UserProfileAndExitDialog></UserProfileAndExitDialog>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
