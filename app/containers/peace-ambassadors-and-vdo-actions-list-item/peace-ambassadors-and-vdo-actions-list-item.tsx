import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "components/text/text"
import {PeaceAmbassadorsAndVdoActionsListItemStyles as styles} from "./peace-ambassadors-and-vdo-actions-list-item.styles"

export interface PeaceAmbassadorsAndVdoActionsListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const PeaceAmbassadorsAndVdoActionsListItemContainer = observer(function PeaceAmbassadorsAndVdoActionsListItem(props: PeaceAmbassadorsAndVdoActionsListItemProps) {
  const { style } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  return (
    <View testID="peaceAmbassadorsAndVdoActionsListItemContainer" style={containerStyle}>
      <Text testID='peaceAmbassadorsAndVdoActionsListItemContainerTestId' style={styles.text}>Hello</Text>
    </View>
  )
})
