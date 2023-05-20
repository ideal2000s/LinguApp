import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAppProviders } from 'students/utils/testUtils';

import CircleProgress from '../CircleProgress';

describe('<CircleProgress />', () => {
  const progress = Math.floor(Math.random() * 100);
  beforeEach(() => {
    renderWithAppProviders(
      <CircleProgress showValue progress={progress} color="#FBFCFF" />
    );
  });

  it('Component should show correct progress value', () => {
    expect(screen.getByText(`${progress}%`)).toBeInTheDocument;
  });
});
