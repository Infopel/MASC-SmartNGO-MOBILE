import {TranslateOptions} from 'i18n-js/typings';
import {i18n} from './i18n';
import {TxKeyPath} from './i18n';

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: TxKeyPath, options?: TranslateOptions) {
  if (!key) throw new Error('Key cannot be nil or empty');
  const trans = i18n.t(key, options);

  if (typeof trans !== 'string')
  throw new Error("The inserted translation key should not map to and object");
  
  return trans;
}
