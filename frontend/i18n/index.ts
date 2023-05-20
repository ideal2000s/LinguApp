import I18n from 'i18n-js';
import I18nContext from './I18nContext';
import { getSupportedLocales } from './Helpers';
import { Translate, I18nProvider } from './components';

const locales = getSupportedLocales();
const t = I18n.t.bind(I18n);
const l = I18n.localize.bind(I18n);

export default I18n;
export { t, l, locales, I18nContext, Translate, I18nProvider };
