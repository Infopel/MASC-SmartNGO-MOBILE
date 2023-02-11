import * as Localization from "expo-localization"
//@ts-ignore
import {I18n} from "i18n-js/dist/require"
import en from "./en"
import pt from "./pt"
export const i18n =  new I18n({en,pt})
i18n.enableFallback = true
i18n.defaultLocale = "en"
// i18n.missingBehavior = "error";

i18n.locale = Localization.locale || "en"

/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

type RecursiveKeyOf<TObj extends Record<string, any>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
  //@ts-ignore  
  ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`
}[keyof TObj & string]
