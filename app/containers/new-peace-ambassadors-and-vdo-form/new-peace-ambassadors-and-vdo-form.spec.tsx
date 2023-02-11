import * as React from "react"
import { renderWithDB } from "utils/test-utils/renderWithDB"
import { NewPeaceAmbassadorsAndVdoFormContainer } from "./new-peace-ambassadors-and-vdo-form"

describe("<NewPeaceAmbassadorsAndVdoFormContainer>",()=>{
 it("render", async function () {
    const component = <NewPeaceAmbassadorsAndVdoFormContainer ></NewPeaceAmbassadorsAndVdoFormContainer>
    
    expect(renderWithDB(component).toJSON()).toMatchSnapshot()
  })
})
  