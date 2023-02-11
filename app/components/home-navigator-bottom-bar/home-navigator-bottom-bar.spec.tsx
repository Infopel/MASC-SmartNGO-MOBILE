import { translate } from "i18n/translate"
import * as React from "react"
import { render } from "utils/test-utils/test-utils"
import { HomeNavigatorBottomBar, HomeNavigatorBottomBarProps } from "./home-navigator-bottom-bar"

const routes = ["home", "search", "settings", "stats", "sync"]
describe("<HomeNavigatorBottomBar>", () => {
  it("Show all screen names", async function () {
    const nav = {
      descriptors: {} as any,
      insets: {} as any,
      navigation: {} as any,
      state: {
        key: "asdsad",
        history: [],
        routes: [],
        stale: false,
        type: "tab",
        index: 0,
        routeNames: routes,
      },
    } as HomeNavigatorBottomBarProps

    const component = <HomeNavigatorBottomBar {...nav} />

    const { getByLabelText, debug } = render(component)
    
    expect(getByLabelText("Home")).toBeTruthy()
    expect(getByLabelText("Search")).toBeTruthy()
    expect(getByLabelText("Settings")).toBeTruthy()
    expect(getByLabelText("Stats")).toBeTruthy()
    expect(getByLabelText("Synchronize")).toBeTruthy()

  })
  it("should have search screen selected", async function () {
    const index = 2
    const nav = {
      descriptors: {} as any,
      insets: {} as any,
      navigation: {} as any,
      state: {
        key: "asdsad",
        history: [],
        routes: [],
        stale: false,
        type: "tab",
        index,
        routeNames: routes
      },
    } as HomeNavigatorBottomBarProps

    const component = <HomeNavigatorBottomBar {...nav} />

    const { getByAccessibilityState, getByLabelText, debug } = render(component)
    
    const selectedElementByState = getByAccessibilityState({selected: true})
    const selectedElementByText =  getByLabelText(translate(`${routes[index]}.title`))
    expect(selectedElementByState).toEqual(selectedElementByText)
  })


})
