import { ITranslatable, translate, TxKeyPath } from "i18n"
import { IInputProps, Input as NBInput } from "native-base"
import * as React from "react"

export interface InputProps extends IInputProps, ITranslatable {
  /**
   * An optional style override useful for padding & margin.
   */
  txPlaceholder?: TxKeyPath
}

/**
 * Describe your component here
 */
export const Input = function Input({
  txPlaceholder: tx,
  placeholder,
  txOptions,
  ...rest
}: InputProps) {
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || placeholder
  return <NBInput {...rest} placeholder={content} />
}
