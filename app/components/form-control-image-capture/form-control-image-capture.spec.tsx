import { Formik } from "formik"
import { translate } from "i18n/translate"
import * as React from "react"
import { fireEvent, render, waitFor } from "utils/test-utils/test-utils"
import { FormControlImageCapture } from "./form-control-image-capture"

describe("<FormControlImageCapture>", () => {
  it("render", async function () {
    const onSubmit = jest.fn()
    const { toJSON, getByText } = render(<Formik onSubmit={onSubmit} initialValues={{ select: undefined }}><FormControlImageCapture {...{ fieldName: 'select', label: 'civic-incubators.delete-item-label' }} /></Formik>)
    expect(getByText(translate('civic-incubators.delete-item-label'))).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
  })
  it("should render component with no images", async function () {
    const onSubmit = jest.fn()
    const { toJSON, queryAllByRole } = render(<Formik onSubmit={onSubmit} initialValues={{ select: undefined }}><FormControlImageCapture {...{ fieldName: 'select', label: 'civic-incubators.delete-item-label' }} /></Formik>)

    expect(queryAllByRole('image').length).toBe(0)

  })
  it("should render component with 2 image", async function () {
    const onSubmit = jest.fn()

    const { toJSON, queryAllByRole } = render(<Formik onSubmit={onSubmit} initialValues={{ item: ["Lama", "Symbiose"] }}><FormControlImageCapture {...{ fieldName: 'item', placeholder: 'civic-incubator-details.title', label: 'civic-incubators.delete-item-label' }} /></Formik>
    )
    expect(queryAllByRole('image').length).toBe(2)

  })


  it("should update value", async function () {
    const onSubmit = jest.fn()
    const { toJSON, getByText, queryAllByRole, getByAccessibilityState, getByRole, debug, queryByDisplayValue } = render(<Formik onSubmit={onSubmit} initialValues={{ select: undefined }}><FormControlImageCapture {...{ fieldName: 'select', testID: "radio-item", placeholder: 'civic-incubator-details.title', label: 'civic-incubators.delete-item-label' }} /></Formik>)
    expect(queryAllByRole('image').length).toBe(0)

    fireEvent.press(getByRole('button', { name: translate('common.camera-add') }))
    await waitFor(() =>
      expect(queryAllByRole('image').length).toBe(1)
    )
  })


})
