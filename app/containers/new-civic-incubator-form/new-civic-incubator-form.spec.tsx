import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { NewCivicIncubatorFormContainer } from "./new-civic-incubator-form"

describe("<NewCivicIncubatorFormContainer>",()=>{
 it("render", async function () {
    const component = <NewCivicIncubatorFormContainer></NewCivicIncubatorFormContainer>
    
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
  