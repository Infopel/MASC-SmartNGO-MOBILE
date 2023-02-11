import { translate } from "i18n/translate"
import * as React from "react"
import { render } from "utils/test-utils/test-utils"
import { Heading } from "./heading"


describe("<Heading>", () => {

  it("show simple text", async function () {
    const text = "Hello world!"
    const component = <Heading>{text}</Heading>

    const { getByText } = render(component)

  
    expect(getByText(text)).toBeTruthy()
  })
  it("show translated text", async function () {
    const text = "civic-incubator-details.title"
    const txText = translate(text)
    const component = <Heading tx={text}/>

    const { getByText } = render(component)

  
    expect(getByText(txText)).toBeTruthy()
  })
 
  it("show non translated text as priority if it is set", async function () {
    const text = "civic-incubator-details.title"
    const txText = translate(text)
    const overrideText = "overrideText"
    const component = <Heading tx={text}>{overrideText}</Heading>

    const { queryByText } = render(component)

  
    expect(queryByText(txText)).toBeFalsy()
    expect(queryByText(overrideText)).toBeTruthy()
  })


})