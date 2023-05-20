import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LangSwitcher from 'students/views/shared/components/LangSwitcher';

import { appDecorator } from '../../utils';

const mock = new MockAdapter(axios);

export default {
  title: 'Common/Navbar/LangSwitcher',
  component: LangSwitcher,
  decorators: [appDecorator]
};

export const LangSwitcherComponent = (): ReactElement => {
  mock.onPatch().reply(200, {});
  return (
    <>
      <LangSwitcher onChange={action('change')} />
    </>
  );
};
LangSwitcherComponent.story = {
  name: 'Desktop'
};

export const LangSwitcherComponentMobile = (): ReactElement => {
  mock.onPatch().reply(200, {});
  return (
    <>
      <LangSwitcher onChange={action('change')} />
    </>
  );
};
LangSwitcherComponentMobile.story = {
  name: 'Mobile',
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphonex'
    }
  }
};
