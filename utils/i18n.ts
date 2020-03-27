import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import cs from '../translations/cs';
import en from '../translations/en';
import es from '../translations/es';
import { TranslationKeys } from '../translations/TranslationKeys';

i18n.translations = { cs, en, es }

i18n.fallbacks = true
i18n.missingBehaviour = 'guess'
i18n.defaultLocale = 'en-US'
i18n.locale = Localization.locale
// i18n.locale = 'cs-CZ' // debug

// export default i18n;

export function getCurrentLocale(): string {
  return i18n.currentLocale()
}

export function t(key: TranslationKeys): string {
  return i18n.t(TranslationKeys[key])
}

export { TranslationKeys as tkeys }
