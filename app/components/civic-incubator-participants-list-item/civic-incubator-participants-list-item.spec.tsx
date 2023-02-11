import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { CivicIncubatorParticipantsListItem } from "./civic-incubator-participants-list-item"



describe("<CivicIncubatorParticipantsListItem>",()=>{
  it("render", async function () {
    const component = <CivicIncubatorParticipantsListItem></CivicIncubatorParticipantsListItem>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
