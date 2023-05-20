import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import SignInVariants from 'students/views/screens/Auth';

import { appDecorator } from '../../utils';

export default {
  title: 'Common/Auth/SignInVariants',
  component: SignInVariants,
  decorators: [appDecorator]
};

const story = (
  <div style={{ padding: 20, background: 'lightblue' }}>
    <SignInVariants />
  </div>
);

export const SignInVariantsComponent = (): JSX.Element => story;

SignInVariantsComponent.story = {
  name: 'SignInVariants',
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  }
};
