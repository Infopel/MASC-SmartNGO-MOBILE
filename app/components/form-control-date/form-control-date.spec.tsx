import { mockAndroidDialogDateChange } from '@react-native-community/datetimepicker/jest'
import { Formik } from "formik"
import { TxKeyPath } from "i18n/i18n"
import { translate } from "i18n/translate"
import * as React from "react"
import { DateUtils } from "utils/DateUitls"
import { fireEvent, render, waitFor } from "utils/test-utils/test-utils"
import { FormControlDate } from "./form-control-date"


describe("<FormControlDate>", () => {

  it("renders", async function () {
    const onSubmit = jest.fn()
    const { getByTestId, getByPlaceholderText } =
      render(
        <Formik initialValues={{ date: undefined }} onSubmit={onSubmit}>

          <FormControlDate testID="date-picker" label='civic-incubators.item-label' fieldName="date" />

        </Formik>)

    expect(getByTestId("date-picker")).toBeTruthy()
    expect(getByPlaceholderText(translate('common.date-placeholder'))).toBeTruthy()
  })

  it("should display placeholder", () => {
    const onSubmit = jest.fn()
    const placeholder: TxKeyPath = "common.district"
    const { getByPlaceholderText } =
      render(
        <Formik initialValues={{ date: undefined }} onSubmit={onSubmit}>

          <FormControlDate placeholder={placeholder} testID="date-picker" label='civic-incubators.item-label' fieldName="date" />

        </Formik>)

    expect(getByPlaceholderText(translate(placeholder))).toBeTruthy()
  })
  it("should display initial date value", async () => {
    const onSubmit = jest.fn()
    const date = Date.now()
    const textDate = DateUtils.formatToShortDate(date)
    const { getByDisplayValue } =
      render(
        <Formik initialValues={{ date }} onSubmit={onSubmit}>

          <FormControlDate testID="date-picker" label='civic-incubators.item-label' fieldName="date" />

        </Formik>)

    expect(getByDisplayValue(textDate)).toBeTruthy()

  })
  it("should updated data value", async () => {

    const onSubmit = jest.fn()
    const newSelectedDate = new Date(0);
    const february = 1;
    newSelectedDate.setFullYear(2022, february, 1);
    const newSelectedTextDate = DateUtils.formatToShortDate(newSelectedDate)
    const { debug, getByDisplayValue, getByTestId } =
      render(
        <Formik initialValues={{ date: undefined }} onSubmit={onSubmit}>

          <FormControlDate testID="date-picker" label='civic-incubators.item-label' fieldName="date" />

        </Formik>)

    mockAndroidDialogDateChange(newSelectedDate)
    fireEvent(getByTestId('date-picker'), 'onPress')

    await waitFor(() => {
      expect(getByDisplayValue(newSelectedTextDate)).toBeTruthy()
    }
    )
  })


})

