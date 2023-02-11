import * as React from "react"
import { render } from "utils/test-utils/test-utils"
import { TextUtils } from "utils/TextUtils"
import { CivicIncubatorToolbar } from "./civic-incubator-toolbar"



describe("<CivicIncubatorToolbar>", () => {
  it("render", async function () {
    const incubator = {
      id:"simpleId",
      district:"KaMavota",
      province:"Maputo Cidade",
      name:"Super Incubadora"
    }
    const {toJSON} =render (<CivicIncubatorToolbar incubator={incubator}></CivicIncubatorToolbar>)
    expect(toJSON()).toMatchSnapshot()
  })
  it("should show name and location", async function () {
    const incubator = {
      id:"simpleId",
      district:"KaMavota",
      province:"Maputo Cidade",
      name:"Super Incubadora"
    }
    const {toJSON, queryByText} =render (<CivicIncubatorToolbar incubator={incubator}></CivicIncubatorToolbar>)
    expect(queryByText(incubator.name)).toBeTruthy()
    expect(queryByText(TextUtils.getIncubatorLocation(incubator.province, incubator.district))).toBeTruthy()
    
  })

})
