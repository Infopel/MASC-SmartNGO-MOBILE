import { IKeyboardAvoidingViewProps } from "native-base/lib/typescript/components/basic/KeyboardAvoidingView/types"
import React from "react"
import { KeyboardOffsets, ScreenPresets } from "./screen.presets"

export interface ScreenProps extends IKeyboardAvoidingViewProps {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * One of the different types of presets.
   */
  preset?: ScreenPresets
  toolbar?: JSX.Element

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
}
