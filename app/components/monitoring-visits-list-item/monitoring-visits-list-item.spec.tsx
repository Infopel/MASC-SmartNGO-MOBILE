import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { MonitoringVisitsListItem } from "./monitoring-visits-list-item"



describe("<MonitoringVisitsListItem>",()=>{
  it("render", async function () {
    const component = <MonitoringVisitsListItem></MonitoringVisitsListItem>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
