import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { PeaceAmbassadorsAndVdoActionsListItem } from "./peace-ambassadors-and-vdo-actions-list-item"



describe("<PeaceAmbassadorsAndVdoActionsListItem>", () => {
  it("render", async function () {
    const component = <PeaceAmbassadorsAndVdoActionsListItem item={{
      coordinatorName: "Mateus", date: 1232134213, id: "sadasdsad", name: "asdfaskdn", numberOfActiveMembers: 8
    }}></PeaceAmbassadorsAndVdoActionsListItem>

    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
