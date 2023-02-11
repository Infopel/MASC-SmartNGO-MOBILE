import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { SavingsGroupMembersListContainer } from "./savings-group-members-list"

describe("<SavingsGroupMembersListContainer>",()=>{
 it("render", async function () {
    const component = <SavingsGroupMembersListContainer></SavingsGroupMembersListContainer>
    
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
  