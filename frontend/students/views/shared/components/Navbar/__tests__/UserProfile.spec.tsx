import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18n';
import { renderWithAppProviders } from 'students/utils/testUtils';

import { mockProfile } from './__mocks__/NavbarMock';
import UserProfile from '../UserProfile';

jest.mock('react-router-dom', () => ({
  Link: ({ props, children }: { props: any; children: any }) => (
    <a {...props}>{children}</a>
  )
}));

jest.mock('students/views/shared/hooks', () => ({
  useBreakPoint: () => false,
  useOutsideClick: () => undefined
}));

describe('<UserProfile />', () => {
  beforeEach(() => {
    renderWithAppProviders(<UserProfile user={mockProfile} />);
  });

  it('Component should contain user full name', () => {
    expect(
      screen.getByText(`${mockProfile.fname} ${mockProfile.lname}`)
    ).toBeInTheDocument();
  });

  it('Should show nav menu after click on use profile', () => {
    const profileBtn = screen.getByRole('article');
    userEvent.click(profileBtn);

    expect(
      screen.getByText(t('frontend.profile.navigation.my_profile'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t('frontend.profile.navigation.settings'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t('frontend.profile.navigation.log_out'))
    ).toBeInTheDocument();
  });
});
