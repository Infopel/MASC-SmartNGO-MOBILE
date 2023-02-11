import { Formik } from "formik"
import * as React from "react"
import { fireEvent, render } from "utils/test-utils/test-utils"
import { FormControlRadio } from "./form-control-radio"



describe("<FormControlRadio>", () => {
  const items = [{ id: '1', name: 'Yes' }, { id: '2', name: 'No' }]
  it("render", async function () {
    const onSubmit = jest.fn()
    const component = <Formik onSubmit={onSubmit} initialValues={{ select: undefined }}><FormControlRadio {...{ fieldName: 'select', label: 'civic-incubators.delete-item-label', items }} /></Formik>

    expect(render(component).toJSON()).toMatchSnapshot()
  })
  it("should all items", async function () {
    const onSubmit = jest.fn()
    const placeholder = "civic-incubator-details.title"
    const { toJSON, getAllByRole, getByText } = render(<Formik onSubmit={onSubmit} initialValues={{ select: undefined }}><FormControlRadio {...{ fieldName: 'select', label: 'civic-incubators.delete-item-label', placeholder, items }} /></Formik>
    )

    expect(getAllByRole('radio').length).toBe(2)
    for (const item of items) {
      expect(getByText(item.name)).toBeTruthy()

    }

    expect(toJSON()).toMatchSnapshot()
  })
  it("should display initial value", async function () {
    const onSubmit = jest.fn()
    const selectedItem = items[1]
    const { debug, toJSON, getByText, getByAccessibilityState } = render(<Formik onSubmit={onSubmit} initialValues={{ item: selectedItem.id }}><FormControlRadio {...{ fieldName: 'item', placeholder: 'civic-incubator-details.title', label: 'civic-incubators.delete-item-label', items }} /></Formik>
    )
    
    expect(getByAccessibilityState({ checked: true })).toHaveTextContent(selectedItem.name)
    expect(toJSON()).toMatchSnapshot()
  })

  it("should update value", async function () {
    const onSubmit = jest.fn()
    const selectedItem = items[0]
    const { toJSON, getByText, getByAccessibilityState, getByRole, debug, queryByDisplayValue } = render(<Formik onSubmit={onSubmit} initialValues={{ select: undefined }}><FormControlRadio {...{ fieldName: 'select', testID: "radio-item", placeholder: 'civic-incubator-details.title', label: 'civic-incubators.delete-item-label', items }} /></Formik>)

    fireEvent.press(getByText(selectedItem.name))
    expect(getByAccessibilityState({ checked: true })).toHaveTextContent(selectedItem.name)
    expect(toJSON()).toMatchSnapshot()
  })
})
