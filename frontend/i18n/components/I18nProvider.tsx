import I18n from 'i18n-js';
import React, { FC, useState, useCallback, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import axios from 'axios';
import { DEFAULT_LOCALE } from '../Config';
import { changeLocale } from '../Helpers';
import I18nContext from '../I18nContext';
import { profileActions } from 'students/stores/user/profile';
import { tAppState } from 'students/stores/rootStore';
import userSelectors from 'students/stores/user/selectors';

I18n.defaultLocale = DEFAULT_LOCALE;

let initialLocale: string | null = null;
try {
  initialLocale = localStorage.getItem('locale');
} catch (e) {
  // Do nothing
}

I18n.locale = initialLocale || DEFAULT_LOCALE;

type tProps = ConnectedProps<typeof connector>;

const I18nProvider: FC<tProps> = ({ children, updateProfileLocale, profile }) => {
  const [locale, setLocale] = useState(initialLocale || DEFAULT_LOCALE);

  useEffect(() => {
    axios.defaults.headers.common['Accept-Language'] = locale;
  }, [locale]);

  const _setLocale = useCallback(
    (locale: string): void => {
      changeLocale(locale);

      if (profile) {
        updateProfileLocale(locale);
      }

      setLocale(locale);
    },
    [updateProfileLocale, setLocale, profile]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale: _setLocale }}>
      {children}
    </I18nContext.Provider>
  );
};

function mapStateToProps(state: tAppState) {
  return {
    profile: userSelectors.selectProfile(state),
    profileLocale: userSelectors.selectProfileLocale(state)
  };
}

const mapDispatchToProps = {
  updateProfileLocale: profileActions.updateProfileLocale
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(I18nProvider);
