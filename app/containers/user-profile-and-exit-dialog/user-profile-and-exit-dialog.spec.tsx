import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { UserProfileAndExitDialogContainer } from "./user-profile-and-exit-dialog"

describe("<UserProfileAndExitDialogContainer>",()=>{
 it("render", async function () {
    const {toJSON} = render(<UserProfileAndExitDialogContainer></UserProfileAndExitDialogContainer>)
    
    expect(toJSON()).toMatchSnapshot()
  })
})
  