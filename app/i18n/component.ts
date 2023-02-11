import {TranslateOptions} from 'i18n-js/typings';
import logger from 'utils/logger';
import {TxKeyPath} from './i18n';
import {translate} from './translate';

export interface ITranslatable {
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TranslateOptions;
}
export interface ITranslatableText extends ITranslatable {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath;

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TranslateOptions;

  /**
   * The text to display if not using `tx` or nested components.
   */

  children?: React.ReactNode;
}

export function translateComponent({
  tx,
  children,
  txOptions,
}: ITranslatableText): React.ReactNode | undefined {
  const i18nText = tx && translate(tx, txOptions);

  if (typeof i18nText !== 'string' && i18nText !== undefined) {
    console.warn('Invalid translated text', {i18nText});
    return children;
  }
  return children || i18nText;
}
