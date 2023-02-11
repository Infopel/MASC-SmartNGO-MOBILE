import { fireEvent, screen, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { CivicIncubatorsListItem } from "./civic-incubators-list-item"

describe("<CivicIncubatorsListItem>", () => {

  it("render", async function () {
    const navigate = jest.fn()
    const remove = jest.fn()
    render(<CivicIncubatorsListItem onNavigate={navigate} onRemove={remove} item={
      {
        date: 14545454151, district: "KaMavota", name: "Xtandamoia", province: "Maputo Cidade", id: "sss"
      }
    }></CivicIncubatorsListItem>)

    expect(screen.toJSON()).toMatchSnapshot()
  })

  it("should handle navigation press ", () => {
    const navigate = jest.fn()
    const remove = jest.fn()
    render(<CivicIncubatorsListItem onNavigate={navigate} onRemove={remove} item={
      {
        date: 14545454151, district: "KaMavota", name: "Xtandamoia", province: "Maputo Cidade", id: 'sss'
      }
    }></CivicIncubatorsListItem>)
    fireEvent.press(screen.getByRole('button'))

    expect(navigate).toHaveBeenCalledTimes(1)
  })
  it("should handle delete press", () => {
    const navigate = jest.fn()
    const remove = jest.fn()
    render(<CivicIncubatorsListItem onNavigate={navigate} onRemove={remove} item={
      {
        date: 14545454151, district: "KaMavota", name: "Xtandamoia", province: "Maputo Cidade", id: "sss"
      }
    }></CivicIncubatorsListItem>)
    fireEvent.press(screen.getByRole('imagebutton'))

    expect(remove).toHaveBeenCalledTimes(1)
  })
})

