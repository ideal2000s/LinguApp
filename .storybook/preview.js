import { addDecorator, addParameters } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addParameters({
  options: {
    showRoots: true
  }
});
