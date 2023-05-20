import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAppProviders } from 'students/utils/testUtils';
import AnswerStatementItem from '../AnswerStatementItem';
import { mockFillInTableAnswer } from './__mocks__/AnswerFillInTableTaskMock';

function renderAnswerStatementItem(audio?: boolean): void {
  renderWithAppProviders(
    <AnswerStatementItem
      options={mockFillInTableAnswer.options}
      columns={mockFillInTableAnswer.options[0].answers.length}
      answers={mockFillInTableAnswer.itemSession.answer}
      question={mockFillInTableAnswer.question}
      columnTitles={{
        h1: 'Heading1',
        h2: 'Heading2',
        h3: 'Heading3'
      }}
      audioUrl={audio ? mockFillInTableAnswer.audioURL : null}
    />
  );
}

describe('<AnswerStatementItem/>', () => {
  it('Component should render item with user answers', () => {
    renderAnswerStatementItem();

    const question = screen.getByRole('heading', {
      name: mockFillInTableAnswer.question
    });

    mockFillInTableAnswer.itemSession.answer.forEach((userAnswer: string) => {
      expect(screen.getByText(userAnswer)).toBeInTheDocument();
    });

    expect(question).toBeInTheDocument();
  });

  it('Component should render audio question', () => {
    renderAnswerStatementItem(true);
    const playButton = screen.getByRole('button', { name: /play/i });

    expect(playButton).toBeInTheDocument();
  });
});
