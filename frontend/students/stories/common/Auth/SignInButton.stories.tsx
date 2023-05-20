import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { SignInButton } from 'students/views/screens/Auth';

import { appDecorator } from '../../utils';

export default {
  title: 'Common/Auth/SignInButton',
  component: SignInButton,
  decorators: [appDecorator]
};
const story = (
  <div style={{ padding: 20, background: 'lightblue' }}>
    <SignInButton />
  </div>
);

export const SignInButtonComponent = (): JSX.Element => story;

SignInButtonComponent.story = {
  name: 'SignInButton',
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  }
};
