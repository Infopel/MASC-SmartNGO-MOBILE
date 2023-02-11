import { fireEvent, render } from "utils/test-utils/test-utils"
import * as React from "react"
import { Input } from "./input"

test("<Input> exists", async function () {
  const text = "hello world!"
  const component = <Input placeholder={text} />

  const { getByPlaceholderText, debug } = render(component)
  const container = getByPlaceholderText(text)

  expect(container).toBeTruthy()
})

