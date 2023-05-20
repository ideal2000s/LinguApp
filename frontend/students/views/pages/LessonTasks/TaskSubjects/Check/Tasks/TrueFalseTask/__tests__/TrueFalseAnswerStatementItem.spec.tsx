import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAppProviders } from 'students/utils/testUtils';
import AnswerTrueFalseItem from '../AnswerStatementItem';
import { mockTrueFalseTask } from './__mocks__/AnswerTrueFalseTaskMock';

describe('<AnswerStatementItem/>', () => {
  beforeEach(() => {
    renderWithAppProviders(
      <AnswerTrueFalseItem
        question={mockTrueFalseTask.statement}
        solution={mockTrueFalseTask.correct}
        answer={mockTrueFalseTask.itemSession.answer}
      />
    );
  });

  it('Component renders item', () => {
    const question = screen.getByText(mockTrueFalseTask.statement);
    expect(question).toBeInTheDocument();
  });
});
