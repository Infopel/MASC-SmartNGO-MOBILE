import { FormControlDate } from "components/form-control-date/form-control-date"
import { FormControlImageCapture } from "components/form-control-image-capture/form-control-image-capture"
import { FormControlInput } from "components/form-control-input/form-control-input"
import { FormControlRadio } from "components/form-control-radio/form-control-radio"
import { FormControlSubForm } from "components/form-control-sub-form/form-control-sub-form"
import { FormControlSeletorContainer } from "containers/form-control-seletor/form-control-seletor"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { IField } from "store/form"
import { EmptyField } from "./EmptyField"


export interface FormControlFieldMapperProps {
    /**
     * An optional style override useful for padding & margin.
     */
    style?: StyleProp<ViewStyle>
    field: IField
    ignoreSubform?: boolean
    setScrollTo?: (y: number) => void
}

/**
 * Describe your component here
 */
export const FieldMapper = function ({ ignoreSubform = false, field, setScrollTo, ...rest }: FormControlFieldMapperProps) {

    const fieldProps = { fieldName: field.id, label: field.name, helperText: field.helperText, validation: field.validation }

    switch (field.type) {
        case 'text':
            return <FormControlInput testID={field.id} {...fieldProps} placeholder={field.placeholder} />
        case 'date':
            return <FormControlDate testID={field.id} {...fieldProps} placeholder={field.placeholder} />
        case 'selector':
            return <FormControlSeletorContainer fromQueryId={field.queryFrom} testID={field.id} {...fieldProps}  items={field.items} placeholder={field.placeholder} />
        case 'radio':
            return <FormControlRadio testID={field.id} {...fieldProps} items={field.items} />
        case 'image':
            return <FormControlImageCapture testID={field.id} {...fieldProps} />
        case 'sub-form':
            if (!ignoreSubform && setScrollTo)
                return <FormControlSubForm setScrollTo={setScrollTo} testID={field.id} {...fieldProps} />
        default:
            return <EmptyField />
    }
}
