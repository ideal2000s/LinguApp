import React from 'react';
import { Provider } from 'react-redux';
import withSRootStyle from '../../views/shared/HOCs/withSRootStyle';
import { I18nProvider } from 'i18n';
import store from 'students/stores/rootStore';

const AppWrapper: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <I18nProvider>
        <main>{children}</main>
      </I18nProvider>
    </Provider>
  );
};

export default withSRootStyle(AppWrapper);
