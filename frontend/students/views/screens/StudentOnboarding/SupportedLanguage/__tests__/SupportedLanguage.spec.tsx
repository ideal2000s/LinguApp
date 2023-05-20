import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { t } from 'i18n';
import { renderWithAppProviders } from 'students/utils/testUtils';

import SupportedLanguage from '../SupportedLanguage';
import { mockLanguages } from './__mocks__/ListSelectorMock';
import { mockProfile } from './__mocks__/SupportedLanguageMock';

const onNextMockHandler = jest.fn();

jest.mock(
  'students/views/screens/StudentOnboarding/components/OnboardingFooter',
  (...params) => () => (
    <button data-testid="footer-next-btn" {...params} onClick={onNextMockHandler}>
      Footer
    </button>
  )
);

const mockStore = configureMockStore();

describe('<SupportedLanguage />', () => {
  beforeEach(() => {
    const store = mockStore({
      user: {
        preferences: {
          targetLangs: mockLanguages,
          allLangs: mockLanguages
        },
        profile: mockProfile
      }
    });

    renderWithAppProviders(<SupportedLanguage />, {}, store);
  });

  it('Component should contain title', () => {
    expect(
      screen.getByText(t('frontend.profile.onboarding.choose_native_language'))
    ).toBeInTheDocument();
  });

  it('Component should fire change event after click on the next button', () => {
    const nextButton = screen.getByTestId('footer-next-btn');
    userEvent.click(nextButton);
    expect(onNextMockHandler).toHaveBeenCalledTimes(1);
  });
});
