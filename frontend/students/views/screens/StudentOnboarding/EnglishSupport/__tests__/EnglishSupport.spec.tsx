import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { t } from 'i18n';

import EnglishSupport from '../EnglishSupport';

const mockOnAnswer = jest.fn((answer: boolean) => answer);

describe('<EnglishSupport />', () => {
  beforeEach(() => {
    render(<EnglishSupport visible onAnswer={mockOnAnswer} />);
  });

  it('Component should contain title and two buttons', () => {
    expect(
      screen.getByText(t('frontend.profile.onboarding.do_you_understand_english'))
    ).toBeInTheDocument();
    expect(screen.getByText(t('frontend.profile.onboarding.no'))).toBeInTheDocument();
    expect(screen.getByText(t('frontend.profile.onboarding.yes'))).toBeInTheDocument();
  });

  it('Component should fire change event after click on Yes/No button', () => {
    const yesButton = screen.getByText(t('frontend.profile.onboarding.yes'));
    userEvent.click(yesButton);
    expect(mockOnAnswer).toHaveBeenCalledTimes(1);
    expect(mockOnAnswer).toHaveBeenCalledWith(true);

    const noButton = screen.getByText(t('frontend.profile.onboarding.no'));
    userEvent.click(noButton);
    expect(mockOnAnswer).toHaveBeenCalledTimes(2);
    expect(mockOnAnswer).toHaveBeenCalledWith(false);
  });
});
