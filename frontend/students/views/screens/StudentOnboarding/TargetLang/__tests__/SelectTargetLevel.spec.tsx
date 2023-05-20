import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { t } from 'i18n';

import { mockLanguages } from './__mocks__/SelectTargetLevelMock';
import SelectTargetLevel from '../SelectTargetLevel/SelectTargetLevel';

const onChangeMockHandler = jest.fn();
const onNextMockHandler = jest.fn();

jest.mock(
  'students/views/screens/StudentOnboarding/components/OnboardingFooter',
  (...params) => () => (
    <button data-testid="footer-next-btn" {...params} onClick={onNextMockHandler}>
      Footer
    </button>
  )
);

describe('<SelectTargetLevel />', () => {
  const selectedLanguage = mockLanguages[1];
  const availableLevels = [
    {
      name: 'zero_level',
      translation: 'frontend.profile.onboarding.language_levels.no_knowledge'
    },
    { name: 'a1', translation: 'frontend.profile.onboarding.language_levels.a1' },
    { name: 'a2', translation: 'frontend.profile.onboarding.language_levels.a2' },
    { name: 'b1', translation: 'frontend.profile.onboarding.language_levels.b1' },
    { name: 'b2', translation: 'frontend.profile.onboarding.language_levels.b2' },
    { name: 'c1', translation: 'frontend.profile.onboarding.language_levels.c1' }
  ];

  beforeEach(() => {
    render(
      <SelectTargetLevel
        language={{
          active: true,
          languageId: selectedLanguage.id,
          level: 'a1'
        }}
        languageName={selectedLanguage.systemName}
        onChangeLevel={onChangeMockHandler}
        onNext={onNextMockHandler}
      />
    );
  });

  it('Component should contain title', () => {
    expect(
      screen.getByText(
        t('frontend.profile.onboarding.what_is_language_level', {
          languageName: selectedLanguage.systemName
        })
      )
    ).toBeInTheDocument();

    availableLevels.forEach((level) =>
      expect(screen.getByText(t(level.translation))).toBeInTheDocument()
    );
  });

  it('Component should fire change handler after selecting new level', () => {
    const a2LevelButton = screen.getByText(t(availableLevels[2].translation));
    userEvent.click(a2LevelButton);
    expect(onChangeMockHandler).toHaveBeenCalledTimes(1);
    expect(onChangeMockHandler).toHaveBeenCalledWith(availableLevels[2].name);
  });

  it('Component should fire change event after click on the next button', () => {
    const nextButton = screen.getByTestId('footer-next-btn');
    userEvent.click(nextButton);
    expect(onNextMockHandler).toHaveBeenCalledTimes(1);
  });
});
