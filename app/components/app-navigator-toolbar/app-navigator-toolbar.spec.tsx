import * as React from "react"
import { render } from "utils/test-utils/test-utils"
import { AppNavigatorToolbar, AppNavigatorToolbarProps } from "./app-navigator-toolbar"

describe("<AppNavigatorToolbar>", () => {
  it("show App toolbar name", function () {
    const nav = {
      layout: {} as any,
      navigation: {} as any,
      options: {} as any,
      route: { key: "dskflslkf", name: "home" },
    } as AppNavigatorToolbarProps

    const component = <AppNavigatorToolbar {...nav} />

    const { getByText } = render(component)
    expect(getByText("Home")).toBeTruthy()
  })

  it("should have back button", async () => {
    const nav = {
      layout: {} as any,
      navigation: {} as any,
      options: {} as any,
      route: { key: "dskflslkf", name: "home" },
    } as AppNavigatorToolbarProps

    const component = <AppNavigatorToolbar backButton {...nav} />

    const { getByTestId } = render(component)
    const backBtn = getByTestId("back")
    expect(backBtn).toBeTruthy()
  })

  it("should replace default title the new givenx", async () => {
    const nav = {
      layout: {} as any,
      navigation: {} as any,
      options: {} as any,
      route: { key: "dskflslkf", name: "home" },
    } as AppNavigatorToolbarProps
    const title = "New Toolbar title"
    const component = <AppNavigatorToolbar title={title} backButton {...nav} />

    const { getByText } = render(component)
    expect(getByText(title)).toBeTruthy()
  })
})
