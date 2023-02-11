import { translate, TxKeyPath } from "i18n"
import i18n from "i18n-js"
import { Heading as NBHeading, IHeadingProps } from "native-base"
import * as React from "react"

export interface HeadingProps extends IHeadingProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
}

/**
 * Describe your component here
 */
export const Heading = function Heading({ tx, txOptions, children, ...rest }: HeadingProps) {
  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = children || i18nText 
  return <NBHeading {...rest}>{content}</NBHeading>
}
