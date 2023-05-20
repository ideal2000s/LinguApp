import React from 'react';
import { DEFAULT_LOCALE } from './Config';

const I18nContext = React.createContext({
  locale: DEFAULT_LOCALE,
  setLocale: (_locale: string) => console.log('setLocale handler should be defined')
});

export default I18nContext;
