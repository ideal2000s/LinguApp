import React from 'react';
import AppWrapper from './AppWrapper';

export function appDecorator(story: () => any): JSX.Element {
  return <AppWrapper>{story()}</AppWrapper>;
}
