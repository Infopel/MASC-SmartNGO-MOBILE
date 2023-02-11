import { StyleSheet } from "react-native"
import { color, typography,spacing,timing } from "../../theme"

export const FormBodyStyles = StyleSheet.create({
  container: { padding: spacing.medium },
  text: { fontFamily: typography.primary, fontSize: 14, color: color.primary },
})
