import React from 'react';
import { hot } from 'react-hot-loader/root';
import { ConnectedRouter } from 'connected-react-router';
import { Provider as AlertProvider, positions } from 'react-alert';
import { History } from 'history';
import { I18nProvider } from 'i18n';

import AlertTemplate from './shared/components/AlertTemplate';
import Routes from './Routes';
import withSRootStyle from './shared/HOCs/withSRootStyle';
import { PreferencesProvider } from './shared/providers/Preferences';

interface IProps {
  history: History;
}
const App: React.FC<IProps> = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <I18nProvider>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <PreferencesProvider>
            <Routes />
          </PreferencesProvider>
        </AlertProvider>
      </I18nProvider>
    </ConnectedRouter>
  );
};
const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000
};
export default hot(withSRootStyle(App));
