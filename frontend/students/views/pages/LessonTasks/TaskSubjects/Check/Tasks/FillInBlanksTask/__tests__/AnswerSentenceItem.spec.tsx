import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithAppProviders } from 'students/utils/testUtils';
import AnswerSentenceItem from '../AnswerSentenceItem';
import { mockSentenceGap } from './__mocks__/AnswerFillInBlanksTaskMock';

jest.mock('students/views/shared/hooks', () => ({
  useBreakPoint: () => false
}));

describe('<AnswerSentenceItem />', () => {
  beforeEach(() => {
    renderWithAppProviders(
      <AnswerSentenceItem
        answer={mockSentenceGap.itemSession.answer}
        solution={mockSentenceGap.solution}
        sentence={mockSentenceGap.question}
      />
    );
  });

  it('Component renders item with user answer', () => {
    mockSentenceGap.itemSession.answer.forEach((answer: string) => {
      const userAnswer = screen.getByText(answer);
      expect(userAnswer).toBeInTheDocument();
    });
  });

  it('Component shows popover on hover', async () => {
    for (const [idx, answer] of mockSentenceGap.itemSession.answer.entries()) {
      const userAnswer = screen.getByText(answer);

      userEvent.hover(userAnswer);

      for (const solution of mockSentenceGap.solution[idx]) {
        await screen.findAllByText(solution);
      }
    }
  });
});
