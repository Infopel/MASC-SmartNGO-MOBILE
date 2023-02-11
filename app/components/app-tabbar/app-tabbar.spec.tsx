import { TxKeyPath } from "i18n/i18n"
import { translate  as tx } from "i18n/translate"
import { TabBarProps } from "navigators/navigators"
import * as React from "react"
import { fireEvent, render } from "utils/test-utils/test-utils"
import { AppTabbar } from "./app-tabbar"

let nav = {
  jumpTo: key => nav = { ...nav, state: { ...nav.state, index: nav.state.routeNames.indexOf((s) => key === s) } },
  state: {
    index: 0,
    routeNames: [
      "civic-incubator-details-events-tab", "civic-incubator-details-participants-tab",
    ],
  }
} as TabBarProps


describe("<AppTabbar>", () => {
  it("render", async function () {
    const component = <AppTabbar {...nav}></AppTabbar>

    expect(render(component).toJSON()).toMatchSnapshot()
  })

  it("should render toolbar buttons", async function () {

    const { getByText, getAllByRole } = render(<AppTabbar {...nav}></AppTabbar>)
    const routes = nav.state.routeNames
    expect(getAllByRole('button').length).toBe(routes.length)

    for (const item of routes) {
      expect(getByText(translate(item))).toBeTruthy()
    }
  })

  it("should have 1st button selected", async function () {

    const routes = nav.state.routeNames
    const { getByText, queryByAccessibilityState } = render(<AppTabbar {...nav}></AppTabbar>)
    expect(queryByAccessibilityState({ selected: true })).toHaveTextContent(translate(routes[0]))
  })

  it("should select 2nd button", async function () {

    const routes = nav.state.routeNames
    const index = 1
    const { getByText, queryByAccessibilityState } = render(<AppTabbar {...nav}></AppTabbar>)
    expect(queryByAccessibilityState({ selected: true })).toHaveTextContent(translate(routes[0]))

    fireEvent.press(getByText(translate(routes[index])))
    expect(queryByAccessibilityState({ selected: true })).toHaveTextContent(translate(routes[index]))
  })
})

function translate(key: TxKeyPath){
  return  tx(key+".title")
}

