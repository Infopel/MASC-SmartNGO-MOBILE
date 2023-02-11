import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "components/text/text"
import {PeaceAmbassadorsAndVdoActionsListStyles as styles} from "./peace-ambassadors-and-vdo-actions-list.styles"

export interface PeaceAmbassadorsAndVdoActionsListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const PeaceAmbassadorsAndVdoActionsListContainer = observer(function PeaceAmbassadorsAndVdoActionsList(props: PeaceAmbassadorsAndVdoActionsListProps) {
  const { style } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  return (
    <View testID="peaceAmbassadorsAndVdoActionsListContainer" style={containerStyle}>
      <Text testID='peaceAmbassadorsAndVdoActionsListContainerTestId' style={styles.text}>Hello</Text>
    </View>
  )
})
