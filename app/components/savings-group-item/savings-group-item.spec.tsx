import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { SavingsGroupItem } from "./savings-group-item"



describe("<SavingsGroupItem>", () => {
  it("render", async function () {
    const component = <SavingsGroupItem item={
      {
        cycleDuration: 20, id: "df", location: "Matola", name: "Andre", numberOfCycles: 1, numberOfMembers: 4
      }
    }></SavingsGroupItem>

    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
