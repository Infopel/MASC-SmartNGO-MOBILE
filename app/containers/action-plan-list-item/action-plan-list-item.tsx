import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "components/text/text"
import {ActionPlanListItemStyles as styles} from "./action-plan-list-item.styles"

export interface ActionPlanListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ActionPlanListItemContainer = observer(function ActionPlanListItem(props: ActionPlanListItemProps) {
  const { style } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  return (
    <View testID="actionPlanListItemContainer" style={containerStyle}>
      <Text testID='actionPlanListItemContainerTestId' style={styles.text}>Hello</Text>
    </View>
  )
})
