import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { PeaceAmbassadorsAndVdoMembersContainer } from "./peace-ambassadors-and-vdo-members"

describe("<PeaceAmbassadorsAndVdoMembersContainer>",()=>{
 it("render", async function () {
    const component = <PeaceAmbassadorsAndVdoMembersContainer></PeaceAmbassadorsAndVdoMembersContainer>
    
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
  