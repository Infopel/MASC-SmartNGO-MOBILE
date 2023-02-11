import { ITranslatable, translate, TxKeyPath } from "i18n"
import * as React from "react"
import { Button as NativeButton, IButtonProps } from "native-base"
import { Platform } from "react-native"


export interface ButtonProps extends IButtonProps, ITranslatable {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  ref?: React.RefObject<typeof Button>
}



/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export const Button = React.forwardRef((props: ButtonProps, ref) => {
  // grab the props
  const { tx, txOptions, children, ...rest } = props
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || children

  return <NativeButton ref={ref} _text={{ textTransform: Platform.OS === 'android' ? 'uppercase' : undefined }} {...rest}>{content}</NativeButton>
})
