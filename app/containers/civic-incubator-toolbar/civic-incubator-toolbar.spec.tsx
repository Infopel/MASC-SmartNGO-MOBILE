import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { CivicIncubatorToolbarContainer } from "./civic-incubator-toolbar"
import { PrimaryStackHeaderProps } from "navigators/navigators"
import { database } from "storage/database"
import { renderWithDB } from "utils/test-utils/renderWithDB"

describe("<CivicIncubatorToolbarContainer>", () => {
  it("render", async function () {
    const nav = {
      route: {
        key: "civic-incubator-toolbar-key", params: { incubatorId: "50" }, name: "civic-incubator-details", path: "/civic-incubator"
      }
    } as PrimaryStackHeaderProps<'civic-incubator-details'>
    const component = <CivicIncubatorToolbarContainer {...nav} database={database}></CivicIncubatorToolbarContainer>

    expect(renderWithDB(component).toJSON()).toMatchSnapshot()
  })
})
