import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { t } from 'i18n';

import { mockLanguages } from './__mocks__/SelectTargetLevelMock';
import { mockProfile } from './__mocks__/SelectTargetLanguageMock';
import SelectTargetLanguage from '../SelectTargetLanguage';

const onLangSelectHandler = jest.fn();
const onNextMockHandler = jest.fn();

jest.mock(
  'students/views/screens/StudentOnboarding/components/OnboardingFooter',
  (...params) => () => (
    <button data-testid="footer-next-btn" {...params} onClick={onNextMockHandler}>
      Footer
    </button>
  )
);

describe('<SelectTargetLanguage />', () => {
  const selectedLanguage = mockLanguages[1];

  beforeEach(() => {
    render(
      <SelectTargetLanguage
        profile={mockProfile}
        targetLangs={mockLanguages}
        selectedLang={{
          active: true,
          languageId: selectedLanguage.id,
          level: 'a1'
        }}
        onLangSelect={onLangSelectHandler}
        onNext={onNextMockHandler}
      />
    );
  });

  it('Component should contain necessary titles', () => {
    expect(
      screen.getByText(new RegExp(t('frontend.profile.onboarding.hello')))
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockProfile.fname))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockProfile.lname))).toBeInTheDocument();
    expect(
      screen.getByText(t('frontend.profile.onboarding.target_language_question'))
    ).toBeInTheDocument();
    expect(screen.getByRole('radio', { checked: true })).toHaveTextContent(
      selectedLanguage.systemName
    );
  });

  it('Component should fire change handler after selecting Danish language', () => {
    const danishLanguageButton = screen.getByText(mockLanguages[0].systemName);
    userEvent.click(danishLanguageButton);
    expect(onLangSelectHandler).toHaveBeenCalledTimes(1);
    expect(onLangSelectHandler).toHaveBeenCalledWith(mockLanguages[0]);
  });

  it('Component should fire change event after click on the next button', () => {
    const nextButton = screen.getByTestId('footer-next-btn');
    userEvent.click(nextButton);
    expect(onNextMockHandler).toHaveBeenCalledTimes(1);
  });
});
