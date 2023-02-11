import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { SavingsGroupMembersItem } from "./savings-group-members-item"



describe("<SavingsGroupMembersItem>", () => {
  it("render", async function () {
    const component = <SavingsGroupMembersItem item={{
      age: 78, id: "asdsad", lastMonitoredAt: 1343433233, loan: 231, name: "Angoche", savings: 15844854
    }}></SavingsGroupMembersItem>

    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
