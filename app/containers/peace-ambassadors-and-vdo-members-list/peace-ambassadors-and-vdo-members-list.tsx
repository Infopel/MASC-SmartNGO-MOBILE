import { Text } from "components/text/text"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { PeaceAmbassadorsAndVdoMembersListStyles as styles } from "./peace-ambassadors-and-vdo-members-list.styles"

export interface PeaceAmbassadorsAndVdoMembersListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const PeaceAmbassadorsAndVdoMembersListContainer = observer(function PeaceAmbassadorsAndVdoMembersList(props: PeaceAmbassadorsAndVdoMembersListProps) {
  const { style } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  return (
    <View testID="peaceAmbassadorsAndVdoMembersListContainer" style={containerStyle}>
      <Text testID='peaceAmbassadorsAndVdoMembersListContainerTestId' style={styles.text}>Hello</Text>
    </View>
  )
})
