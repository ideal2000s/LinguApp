import I18n from 'i18n-js';
import { DEFAULT_LOCALE, supportedLocales } from './Config';

interface SupportedLocale {
  lKey: string;
  flagSrc: any;
  labelKey: string;
}

export const getSupportedLocales = (): SupportedLocale[] =>
  [...supportedLocales]
    .map(([lKey, lFlag]) => {
      try {
        I18n.translations[lKey] = require(`./translations/${lKey}.json`)[lKey];
        const flagSrc = require(`./flags/${lFlag}.svg`);

        return {
          lKey,
          flagSrc,
          labelKey: `frontend.locale.locales.${lKey}`
        };
      } catch {
        return undefined;
      }
    })
    .filter(Boolean) as SupportedLocale[];

export function changeLocale(locale: string): void {
  const selectedLocale = locale || DEFAULT_LOCALE;
  try {
    localStorage.setItem('locale', selectedLocale);
  } catch (_e) {
    // Do nothing
  }

  try {
    I18n.locale = selectedLocale;
  } catch (_e) {
    // Do nothing
  }
}
