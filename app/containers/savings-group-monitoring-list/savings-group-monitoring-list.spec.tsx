import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { SavingsGroupMonitoringListContainer } from "./savings-group-monitoring-list"

describe("<SavingsGroupMonitoringListContainer>",()=>{
 it("render", async function () {
    const component = <SavingsGroupMonitoringListContainer></SavingsGroupMonitoringListContainer>
    
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
  