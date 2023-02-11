import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { MonitoringVisitsListContainer } from "./monitoring-visits-list"

describe("<MonitoringVisitsListContainer>",()=>{
 it("render", async function () {
    const {toJSON} = render(<MonitoringVisitsListContainer></MonitoringVisitsListContainer>)
    
    expect(toJSON()).toMatchSnapshot()
  })
})
  