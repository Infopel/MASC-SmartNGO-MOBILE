import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { CivicIncubatorEventsListContainer } from "./civic-incubator-events-list"

describe("<CivicIncubatorEventsListContainer>",()=>{
 it("render", async function () {
    const {toJSON} = render(<CivicIncubatorEventsListContainer></CivicIncubatorEventsListContainer>)
    
    expect(toJSON()).toMatchSnapshot()
  })
})
  