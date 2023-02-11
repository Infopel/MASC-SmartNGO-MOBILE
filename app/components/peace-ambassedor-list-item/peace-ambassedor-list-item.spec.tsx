import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { PeaceAmbassedorListItem } from "./peace-ambassedor-list-item"



describe("<PeaceAmbassedorListItem>", () => {
  it("render", async function () {
    const component = <PeaceAmbassedorListItem item={{
      date: 3213213321, district: "Moamba", id: "asdasdsadsad", name: "Judas",
    }}></PeaceAmbassedorListItem>

    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
