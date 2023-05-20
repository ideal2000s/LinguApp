import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAppProviders } from 'students/utils/testUtils';

import Navbar from '../Navbar';

jest.mock('students/views/shared/hooks', () => ({
  useBreakPoint: () => false,
  useOutsideClick: () => undefined
}));

describe('<Navbar />', () => {
  beforeEach(() => {
    renderWithAppProviders(<Navbar />);
  });

  it('Component should contain logo', () => {
    expect(screen.getByAltText('Lingutest')).toBeInTheDocument();
  });
});
