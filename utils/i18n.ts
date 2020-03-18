import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import cs from '../translations/cs';
import en from '../translations/en';
import es from '../translations/es';
import { TranslationKeys } from '../translations/TranslationKeys';

i18n.translations = { cs, en, es }

i18n.fallbacks = true
i18n.missingBehaviour = 'guess'
i18n.defaultLocale = 'en'
i18n.locale = Localization.locale

// export default i18n;

export function t(key: TranslationKeys): string {
  return i18n.t(TranslationKeys[key])
}
const foo = 1

export { TranslationKeys as tkeys }
