import { translate } from "i18n/translate"
import * as React from "react"
import { IField } from "store/form"
import { fireEvent, render } from "utils/test-utils/test-utils"

import { FormBody } from "./form-body"



describe("<FormBody>", () => {
  it("render", async function () {
    const component = <FormBody fields={[]}></FormBody>
    expect(render(component).toJSON()).toMatchSnapshot()
  })

  it('should render finish button by default', function () {
    const { queryByText } = render(<FormBody fields={[]}></FormBody>)
    expect(queryByText(translate('form.submit'))).toBeTruthy()

  })

  it("should handle next page button if is not last page", function () {
    const buttonPress = jest.fn()
    const { getByText, queryByText } = render(<FormBody nextPage={buttonPress} isLastPage={false} fields={[]}></FormBody>)
    expect(queryByText(translate('form.submit'))).toBeFalsy()
    const button = getByText(translate('form.next-page'))
    fireEvent.press(button)
    expect(buttonPress).toBeCalled()
  })

  it("should not handle next page button if is last page", function () {
    const buttonPress = jest.fn()
    const { getByText, queryByText } = render(<FormBody nextPage={buttonPress} isLastPage={true} fields={[]}></FormBody>)
    expect(queryByText(translate('form.next-page'))).toBeFalsy()
    const button = getByText(translate('form.submit'))
    fireEvent.press(button)
    expect(buttonPress).not.toBeCalled()
  })

  it("should set previous button as disabled if is first page", () => {
    const buttonPress = jest.fn()
    const { getByText } = render(<FormBody prevPage={buttonPress} isFirstPage={true} isLastPage={false} fields={[]}></FormBody>)
    expect(getByText(translate('form.prev-page'))).toBeDisabled()

  })

  it("should not render previous page button", () => {
    const { getByText, queryByText } = render(<FormBody isLastPage={false} fields={[]}></FormBody>)
    expect(queryByText(translate('form.prev-page'))).toBeFalsy()

  })

  it("should handle previous page", function () {
    const buttonPress = jest.fn()
    const { getByText } = render(<FormBody prevPage={buttonPress} fields={[]}></FormBody>)
    const button = getByText(translate('form.prev-page'))
    fireEvent.press(button)
    expect(buttonPress).toBeCalled()
  })

  it("should render a text field", () => {
    const field: IField = { id: "text", name: "civic-incubator-details.title", type: "text" }
    const { getByText } = render(<FormBody fields={[field]} />)
    expect(getByText(translate(field.name))).toBeTruthy()
  })
  it("should render a date field", () => {
    const field: IField = { id: "text", name: "civic-incubator-details.title", type: "date" }
    const { getByText, debug } = render(<FormBody fields={[field]} />)
    expect(getByText(translate(field.name))).toBeTruthy()

  })
  it("should render a radiogroup field", () => {
    const field: IField = { id: "text", name: "civic-incubator-details.title", type: "radio", items:[{id:"sumba ud", name:"Non existent"},{id:"sba ud", name:"Existent"}] }
    const { getByText, debug } = render(<FormBody fields={[field]} />)
    expect(getByText(translate(field.name))).toBeTruthy()

  })
  it("should render a image capture field", () => {
    const field: IField = { id: "text", name: "civic-incubator-details.title", type: "image", items:[{id:"sumba ud", name:"Non existent"},{id:"sba ud", name:"Existent"}] }
    const { getByText, debug } = render(<FormBody fields={[field]} />)
    expect(getByText(translate(field.name))).toBeTruthy()

  })
  it("should render a selector field", () => {
    const field: IField = {
      id: "text", name: "civic-incubator-details.title", type: "selector", items: [{ id: "1", name: "Water" }, { id: "2", name: "Tomato" }]
    }
    const { getByText, getAllByText } = render(<FormBody fields={[field]} />)
    expect(getAllByText(translate(field.name)).length).toBe(2)
    expect(getByText((field.items[0].name))).toBeTruthy()
    expect(getByText((field.items[1].name))).toBeTruthy()
  })
  it("should render a list with all types output", () => {
    const fields: IField[] = [{
      id: "texssst", name: "civic-incubators.search", type: "text",
    },
    { id: "texsadt", name: "civic-incubator-details.title", type: "date", },
    {
      id: "textas", name: "new-civic-incubator.admin-post", type: "selector", items: [{ id: "1", name: "Water" }, { id: "2", name: "Tomato" }]
    }]

    const { getByText, getAllByText } = render(<FormBody fields={fields} />)
    expect(getByText(translate(fields[0].name))).toBeTruthy()
    expect(getByText(translate(fields[1].name))).toBeTruthy()
    expect(getAllByText(translate(fields[2].name)).length).toBe(2)

  })
})
