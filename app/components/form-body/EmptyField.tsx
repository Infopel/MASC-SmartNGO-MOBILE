import { View } from "native-base"
import * as React from "react"

export interface FormControlFieldMapperProps {
}

/**
 * Describe your component here
 */
export const EmptyField = function (props: FormControlFieldMapperProps) {
    return (
        <View accessibilityLabel="Empty field" />
    )
}
