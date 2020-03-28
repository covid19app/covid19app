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

export function t(key: TranslationKeys): string {
  return i18n.t(TranslationKeys[key])
}

export { TranslationKeys as tkeys }

export function getCurrentLocale(): string {
  return i18n.currentLocale()
}

export function temperatureToString(temperatureInC: number): string {
  // import * as RNLocalize from 'react-native-localize';
  // const temperatureUnit = RNLocalize.getTemperatureUnit()
  const temperatureUnit = getCurrentLocale().match(/.*[-_]US/i) && 'fahrenheit' || 'celsius'

  switch (temperatureUnit) {
    case 'celsius':
      return `${temperatureInC && temperatureInC.toFixed(1).padStart(4, ' ')} C`
    case 'fahrenheit':
      const temperatureInF = (temperatureInC * 9/5) + 32
      return `${temperatureInF && temperatureInF.toFixed(1).padStart(5, ' ')} F`
  }
}
