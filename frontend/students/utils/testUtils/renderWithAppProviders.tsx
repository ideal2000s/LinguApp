import React, { ReactElement } from 'react';
import { render as rtlRender, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MockStoreEnhanced } from 'redux-mock-store';
import { I18nProvider } from 'i18n';
import rootStore from 'students/stores/rootStore';
import withSRootStyle from 'students/views/shared/HOCs/withSRootStyle';

const renderWithAppProviders = (
  Component: ReactElement,
  renderOptions = {},
  mockStore?: MockStoreEnhanced<unknown, any>
): RenderResult => {
  const ComponentToRender = withSRootStyle(() => (
    <I18nProvider>{Component}</I18nProvider>
  ));

  return rtlRender(
    <Provider store={mockStore || rootStore}>
      <ComponentToRender />
    </Provider>,
    renderOptions
  );
};

export default renderWithAppProviders;
