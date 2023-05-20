import React, { ReactElement } from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import FontSizeSwitcher from 'students/views/shared/components/FontSizeSwitcher';

import { appDecorator } from '../../utils';

export default {
  title: 'Common/Navbar/FontSizeSwitcher',
  component: FontSizeSwitcher,
  decorators: [appDecorator]
};
const story = (
  <>
    <FontSizeSwitcher />
    <p>Some text for test</p>
  </>
);

export const FontSizeSwitcherComponent = (): ReactElement => story;
FontSizeSwitcherComponent.story = {
  name: 'Desktop'
};

export const FontSizeSwitcherComponentMobile = (): ReactElement => story;
FontSizeSwitcherComponentMobile.story = {
  name: 'Mobile',
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphonex'
    }
  }
};
