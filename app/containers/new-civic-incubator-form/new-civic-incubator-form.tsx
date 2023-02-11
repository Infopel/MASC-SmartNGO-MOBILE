import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { Button } from "components/button/button"
import { FormControlDate } from "components/form-control-date/form-control-date"
import { FormControlInput } from "components/form-control-input/form-control-input"
import { FormControlSeletor } from "components/form-control-seletor/form-control-seletor"
import { Formik, FormikHelpers } from "formik"
import { goBack } from "navigators/navigation-utilities"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { compose } from 'recompose'
import { createInitiative, CreateInitiativeParams } from "storage/mutations/initiative.mutations"
import { findAllDistricts, findAllProvinces, ILocation } from "storage/queries/location"
import * as yup from 'yup'

export interface NewCivicIncubatorFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  provinces: ILocation[]
  districts: ILocation[]
}

/**
 * Describe your component here
 */
const Container = function (props: NewCivicIncubatorFormProps) {
  const { style, provinces, districts } = props
  const validationSchema = yup.object().shape({
    adminPost: yup.string().required(),
    dateConstitution: yup.date().required(),
    districtId: yup.string().required(),
    latLng: yup.object().shape({
      latitude: yup.number().required(), longitude: yup.number().required()
    }).required(),
    locality: yup.string().required(),
    name: yup.string().required(),
    provinceId: yup.string().required()
  })



  async function create(values: CreateInitiativeParams, helpers: FormikHelpers<CreateInitiativeParams>) {
    await createInitiative({ ...values, type: 'civic-incubator' })
    goBack()
  }

  return (
    <Formik {...{ initialValues: {}, validationSchema, onSubmit: create }}>
      {({ handleSubmit }) => <>
        <FormControlInput label='new-civic-incubator.productName' fieldName="name" />
        <FormControlSeletor fieldName="provinceId" testID="province" label='new-civic-incubator.province' placeholder={'common.select-an-item'} items={provinces} />
        <FormControlSeletor fieldName="districtId" testID="district" label='new-civic-incubator.district' placeholder={'common.select-an-item'} items={districts} />
        <FormControlInput label='new-civic-incubator.admin-post' fieldName="adminPost" />
        <FormControlInput label='new-civic-incubator.locality' fieldName="locality" />
        <FormControlInput label='new-civic-incubator.longitude' fieldName='latLng.longitude' />
        <FormControlInput label='new-civic-incubator.latitude' fieldName='latLng.latitude' />
        <FormControlDate label='new-civic-incubator.date-constitution' fieldName='dateConstitution' />
        <Button tx="common.save" testID="save" onPress={handleSubmit.bind(this, undefined)}></Button>
      </>}
    </Formik>
  )
}

export const NewCivicIncubatorFormContainer = compose(
  withDatabase,
  withObservables(['database'], ({ database }) => ({
    provinces: findAllProvinces(database), districts: findAllDistricts(database)
  }))
)(Container)