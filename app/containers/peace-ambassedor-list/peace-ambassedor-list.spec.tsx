import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { PeaceAmbassedorListContainer } from "./peace-ambassedor-list"

describe("<PeaceAmbassedorListContainer>",()=>{
 it("render", async function () {
    const component = <PeaceAmbassedorListContainer></PeaceAmbassedorListContainer>
    
    expect(render(component).toJSON()).toMatchSnapshot()
  })
})
  