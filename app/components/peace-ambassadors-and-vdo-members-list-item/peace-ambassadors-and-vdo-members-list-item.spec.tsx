import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { PeaceAmbassadorsAndVdoMembersListItem } from "./peace-ambassadors-and-vdo-members-list-item"



describe("<PeaceAmbassadorsAndVdoMembersListItem>", () => {
  it("render", async function () {
    const component = <PeaceAmbassadorsAndVdoMembersListItem item={{
      age: 25, date: 234245324324, function: "Professor", id: "adasd", name: "Antonio"
    }}></PeaceAmbassadorsAndVdoMembersListItem>

    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
