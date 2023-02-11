import { Formik } from "formik"
import { translate } from "i18n/translate"
import * as React from "react"
import { fireEvent, render } from "utils/test-utils/test-utils"
import { FormControlSeletor } from "./form-control-seletor"


describe("<FormControlSeletor>", () => {
  const items = [{ id: '1', name: 'Angonia' }, { id: '2', name: 'Matola ' }]
  it("render", async function () {
    const onSubmit = jest.fn()
    const component = <Formik onSubmit={onSubmit} initialValues={{ select: undefined }}><FormControlSeletor {...{ fieldName: 'select', label: 'civic-incubators.delete-item-label', items: [{ id: 'as', name: 'asdsa' }] }} /></Formik>

    expect(render(component).toJSON()).toMatchSnapshot()
  })
  it("should show placeholder", async function () {
    const onSubmit = jest.fn()
    const placeholder = "civic-incubator-details.title"
    const { toJSON, getByPlaceholderText } = render(<Formik onSubmit={onSubmit} initialValues={{ select: undefined }}><FormControlSeletor {...{ fieldName: 'select', label: 'civic-incubators.delete-item-label', placeholder, items: [{ id: 'as', name: 'asdsa' }] }} /></Formik>
    )
    expect(getByPlaceholderText(translate(placeholder))).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
  })
  it("should display initial value", async function () {
        const onSubmit = jest.fn()
    const {debug, toJSON, getByDisplayValue } = render(<Formik onSubmit={onSubmit} initialValues={{ select: "1" }}><FormControlSeletor {...{ fieldName: 'select', placeholder: 'civic-incubator-details.title', label: 'civic-incubators.delete-item-label', items }} /></Formik>
    )
    debug("initial value")
    expect(getByDisplayValue(items[0].name)).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
  })

  it("should update value", async function () {
    const onSubmit = jest.fn()
    const { toJSON, getByText, getByRole, debug, queryByDisplayValue } = render(<Formik onSubmit={onSubmit} initialValues={{ select: undefined }}><FormControlSeletor {...{ fieldName: 'select', testID: "selector", placeholder: 'civic-incubator-details.title', label: 'civic-incubators.delete-item-label', items }} /></Formik>)
    debug("update value")
    expect(queryByDisplayValue(items[0].name)).toBeFalsy()
    fireEvent.press(getByRole('button'))
    fireEvent.press(getByText(items[0].name))
    expect(queryByDisplayValue(items[0].name)).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
  })

})

