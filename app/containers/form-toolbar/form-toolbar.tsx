import { FormToolbar } from "components/form-toolbar/form-toolbar"
import { observer } from "mobx-react-lite"
import { PrimaryStackHeaderProps } from "navigators/navigators"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { useFormStore } from "store/form"


export interface FormToolbarProps extends PrimaryStackHeaderProps<"form"> {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FormToolbarContainer = observer(function (props: FormToolbarProps) {


  const page = useFormStore((state) => state.page())
  const pageInfo = page?.stepCount === 1 || page === undefined ? undefined : {
    stepCount: page.stepCount,
    currentStep: page.index + 1,
    subTitle: page.subTitle
  }
  return (
    <FormToolbar {...props} pageInfo={pageInfo} />
  )
})
