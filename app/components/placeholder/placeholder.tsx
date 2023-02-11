import { Text } from "components/text/text"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { PlaceholderStyles as styles } from "./placeholder.styles"

export interface PlaceholderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Placeholder = function Placeholder(props: PlaceholderProps) {
  const { style } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  return (
    <View style={containerStyle}>
      <Text tx='common.empty_list_message' />
    </View>
  )
}
