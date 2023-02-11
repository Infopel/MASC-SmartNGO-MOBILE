import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { Button } from "components/button/button"
import { FormControlDate } from "components/form-control-date/form-control-date"
import { FormControlInput } from "components/form-control-input/form-control-input"
import { FormControlSeletor } from "components/form-control-seletor/form-control-seletor"
import { Formik, FormikHelpers } from "formik"
import { PeaceAmbassadorsAndVdoRoute } from "navigators"
import { goBack } from "navigators/navigation-utilities"
import * as React from "react"
import { compose } from "recompose"
import { createInitiative, CreateInitiativeParams } from "storage/mutations/initiative.mutations"
import { findAllDistricts, findAllProvinces, ILocation } from "storage/queries/location"
import * as yup from 'yup'


export interface NewPeaceAmbassadorsAndVdoFormProps {
  type: PeaceAmbassadorsAndVdoRoute
  provinces: ILocation[]
  districts: ILocation[]
}

/**
* Describe your component here
*/
const Container = function (props: NewPeaceAmbassadorsAndVdoFormProps) {
  const { provinces, districts, type } = props
  const validationSchema = yup.object().shape({
    provinceId: yup.string().required(),
    districtId: yup.string().required(),
    zone: yup.string().required(),
    locality: yup.string().required(),
    name: yup.string().required(),
    dateOfConstitution: yup.date().required(),
    numberOfMembers: yup.number().positive().required(),
    numberOfActiveMembers: yup.number().positive().required(),
  })

  async function create(values: CreateInitiativeParams, helpers: FormikHelpers<Partial<CreateInitiativeParams>>) {
    console.log({ values })
    await createInitiative({ ...values, type })
    goBack()
  }

  return (
    <Formik {...{ initialValues: {}, validationSchema, onSubmit: create }}>
      {({ handleSubmit }) => <>
        <FormControlInput label='common.name' fieldName="name" testID="name" />
        <FormControlSeletor fieldName="provinceId" testID="province" label='common.province' placeholder={'common.select-an-item'} items={provinces} />
        <FormControlSeletor fieldName="projectId" testID="projectId" label='common.project' placeholder={'common.select-an-item'} items={[]} />
        <FormControlSeletor fieldName="districtId" testID="district" label='common.district' placeholder={'common.select-an-item'} items={districts} />
        <FormControlInput label='common.zone' fieldName="zone" testID="zone" />
        <FormControlInput label='common.locality' fieldName="locality" testID="locality" />
        <FormControlDate label='new-peace-ambassadors-and-vdo.date-of-constitution' testID="dateOfConstitution" fieldName='dateConstitution' />
        <FormControlInput fieldName="numberOfMembers" testID="numberOfMembers" label='new-peace-ambassadors-and-vdo.number-of-members' />
        <FormControlInput fieldName="numberOfActiveMembers" testID="numberOfActiveMembers" label='new-peace-ambassadors-and-vdo.number-of-active-members' />
        <Button tx="common.save" testID="save" onPress={handleSubmit.bind(this, undefined)}></Button>
      </>}
    </Formik>
  )
}


export const NewPeaceAmbassadorsAndVdoFormContainer = compose(
  withDatabase,
  withObservables(['database'], ({ database }) => ({
    provinces: findAllProvinces(database), districts: findAllDistricts(database)
  }))
)(Container)