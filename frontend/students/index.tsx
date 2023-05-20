import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import setupSentry from './utils/setupSentry';
import rootStore, { history } from './stores/rootStore';
import ErrorBoundary from './views/shared/components/ErrorBoundary';
import { init } from 'students/stores/_utils/common';
import './styles.scss';

const APP_DOM_ID = 'app';
setupSentry();
rootStore.dispatch(init());

export default function (): void {
  const container = document.createElement('div');
  container.id = APP_DOM_ID;
  document.body.appendChild(container);

  const render = () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const App = require('./views/App').default;

    ReactDOM.render(
      <ErrorBoundary>
        <Provider store={rootStore}>
          <App history={history} />
        </Provider>
      </ErrorBoundary>,
      document.getElementById(APP_DOM_ID)
    );
  };

  render();

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./views/App', render);
  }
}
