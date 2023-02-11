import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { PeaceAmbassadorsAndVdoMembersListContainer } from "./peace-ambassadors-and-vdo-members-list"

describe("<PeaceAmbassadorsAndVdoMembersListContainer>",()=>{
 it("render", async function () {
    const component = <PeaceAmbassadorsAndVdoMembersListContainer></PeaceAmbassadorsAndVdoMembersListContainer>
    
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
  