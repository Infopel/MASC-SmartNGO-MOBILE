import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { SyncErrorContainer } from "./sync-error"

describe("<SyncErrorContainer>",()=>{
 it("render", async function () {
    const {toJSON} = render(<SyncErrorContainer></SyncErrorContainer>)
    
    expect(toJSON()).toMatchSnapshot()
  })
})
  