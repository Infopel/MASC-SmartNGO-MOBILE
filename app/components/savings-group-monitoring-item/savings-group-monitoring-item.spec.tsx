import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { SavingsGroupMonitoringItem } from "./savings-group-monitoring-item"



describe("<SavingsGroupMonitoringItem>",()=>{
  it("render", async function () {
    const component = <SavingsGroupMonitoringItem item={{
      age:28,id:"dfsf",name:"Igdrassil",savings:50000
    }}></SavingsGroupMonitoringItem>
  
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
