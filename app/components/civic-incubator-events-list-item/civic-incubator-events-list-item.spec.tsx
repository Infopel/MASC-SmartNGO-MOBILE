import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { CivicIncubatorEventsListItem } from "./civic-incubator-events-list-item"



describe("<CivicIncubatorEventsListItem>",()=>{
  it("render", async function () {
    const component = <CivicIncubatorEventsListItem></CivicIncubatorEventsListItem>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
