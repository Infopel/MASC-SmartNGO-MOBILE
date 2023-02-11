import { Icon } from "native-base"
import { Button } from "components/button/button"
import { Text } from "components/text/text"
import React, { ErrorInfo } from "react"
import { ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { color } from "../../theme"
import { MaterialIcons } from '@expo/vector-icons'

const CONTAINER: ViewStyle = {
  alignItems: "center",
  flex: 1,
  padding: 16,
  paddingVertical: 50,
  backgroundColor: color.background,
}

const ERROR_DETAILS_CONTAINER: ViewStyle = {
  width: "100%",
  maxHeight: "60%",
  backgroundColor: color.line,
  marginVertical: 15,
  paddingHorizontal: 10,
  paddingBottom: 15,
  borderRadius: 6,
}

const BTN_RESET: ViewStyle = {
  paddingHorizontal: 40,

  backgroundColor: color.primary,
}

const TITLE_ERROR: TextStyle = {
  color: color.error,
  fontWeight: "bold",
  paddingVertical: 15,
}

const FRIENDLY_SUBTITLE: TextStyle = {
  color: color.palette.black,
  fontWeight: "normal",
  paddingVertical: 15,
}

const CONTENT_ERROR: TextStyle = {
  color: color.error,
  fontWeight: "bold",
  paddingVertical: 15,
}

// Uncomment this and the Text component in the ErrorComponent if
// you want to see a backtrace in your error reporting screen.
const CONTENT_BACKTRACE: TextStyle = {
  color: color.dim,
}

const ICON: ImageStyle = {
  marginTop: 30,
  width: 64,
  height: 64,
}

export interface ErrorComponentProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}

/**
 * Describe your component here
 */
export const ErrorComponent = (props: ErrorComponentProps) => {
  return (
    <View style={CONTAINER}>
      <Icon style={ICON} as={MaterialIcons} name="bug-report" />
      <Text style={TITLE_ERROR} tx={"error.title"} />
      <Text style={FRIENDLY_SUBTITLE} tx={"error.friendlySubtitle"} />
      <View style={ERROR_DETAILS_CONTAINER}>
        <ScrollView>
          <Text selectable style={CONTENT_ERROR}>
            {props.error.message}
          </Text>
          <Text selectable style={CONTENT_BACKTRACE} tx={`${props.errorInfo.componentStack}`} >
            {props.error.stack}
          </Text>
        </ScrollView>
      </View>
      <Button style={BTN_RESET} onPress={props.onReset} tx="error.reset" />
    </View>
  )
}
