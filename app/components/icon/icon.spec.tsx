import * as React from "react"
import { render } from "utils/test-utils/test-utils"
import { Icon } from "./icon"

const empty = `"M8.70533 9.34281C8.70369 9.38156 8.70999 9.42024 8.72385 9.45647C8.73771 9.4927 8.75883 9.52571 8.78592 9.55347C8.81301 9.58123 8.84549 9.60316 8.88136 9.6179C8.91724 9.63265 8.95575 9.6399 8.99453 9.63921H9.98453C10.1501 9.63921 10.2821 9.50361 10.3037 9.33921C10.4117 8.55201 10.9517 7.97841 11.9141 7.97841C12.7373 7.97841 13.4909 8.39001 13.4909 9.38001C13.4909 10.142 13.0421 10.4924 12.3329 11.0252C11.5253 11.612 10.8857 12.2972 10.9313 13.4096L10.9349 13.67C10.9362 13.7487 10.9684 13.8238 11.0245 13.879C11.0806 13.9343 11.1562 13.9652 11.2349 13.9652H12.2081C12.2877 13.9652 12.364 13.9336 12.4203 13.8773C12.4765 13.8211 12.5081 13.7448 12.5081 13.6652V13.5392C12.5081 12.6776 12.8357 12.4268 13.7201 11.756C14.4509 11.2004 15.2129 10.5836 15.2129 9.28881C15.2129 7.47561 13.6817 6.59961 12.0053 6.59961C10.4849 6.59961 8.81933 7.30761 8.70533 9.34281ZM10.5737 16.2584C10.5737 16.898 11.0837 17.3708 11.7857 17.3708C12.5165 17.3708 13.0193 16.898 13.0193 16.2584C13.0193 15.596 12.5153 15.1304 11.7845 15.1304C11.0837 15.1304 10.5737 15.596 10.5737 16.2584Z`

describe("<Icon>", () => {
  test("Should show material icon", async function () {
    const component = <Icon type="material" name="pie-chart" />

    const { toJSON, debug } = render(component)
    debug("MATERIAL")
    expect(JSON.stringify(toJSON())).not.toContain(empty)
  })
  test("Should show material community icon", async function () {
    const component = <Icon type="material-community" name="table" />

    const { toJSON } = render(component)
    expect(JSON.stringify(toJSON())).not.toContain(empty)
  })
  test("Should show no icon", async function () {
    const component = (
      <Icon
        //@ts-ignore
        name="sss"
      />
    )

    const { getByText, debug } = render(component)
    expect(getByText("?")).toBeTruthy()
  })
})
