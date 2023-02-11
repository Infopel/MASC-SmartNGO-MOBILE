import { translateComponent } from "i18n"
import { Text as ReactNativeText } from "native-base"
import * as React from "react"
import { TextProps } from "./text.props"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const { tx, txOptions, children, ...rest } = props

  // figure out which content to use
  const text = translateComponent({tx, txOptions, children})
  return <ReactNativeText {...rest}>{text}</ReactNativeText>
}
