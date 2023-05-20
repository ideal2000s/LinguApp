import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import StatementItem from '../StatementItem';
import DemoStatementItem from '../DemoStatementItem';
import { textMockStatement } from './__mocks__/TextStatementItemMock';
import { audioMockStatement } from './__mocks__/AudioStatementItemMock';

function checkInputTypeOnChangeEvent(handler: () => void) {
  const answer1 = 'Answer 1';
  const column1InputField = screen.getByText('', {
    selector: `input[id='${textMockStatement.item.id}_column1']`
  });
  userEvent.type(column1InputField, answer1);

  expect(handler).toHaveBeenCalledTimes(answer1.length);
  for (let i = 1; i <= answer1.length; i += 1) {
    expect(handler).toHaveBeenCalledWith({
      itemId: textMockStatement.item.id,
      answers: [answer1.slice(0, i), '']
    });
  }

  const answer2 = 'Answer 2';
  const column2InputField = screen.getByText('', {
    selector: `input[id='${textMockStatement.item.id}_column2']`
  });
  userEvent.type(column2InputField, answer2);

  expect(handler).toHaveBeenCalledTimes(answer1.length + answer2.length);
  for (let i = 1; i <= answer2.length; i += 1) {
    expect(handler).toHaveBeenCalledWith({
      itemId: textMockStatement.item.id,
      answers: [answer1, answer2.slice(0, i)]
    });
  }
}

describe('<StatementItem />', () => {
  describe('Test Text Statement item', () => {
    const mockHandleSelectAnswer = jest.fn();

    it('Demo item should contain question and answers', () => {
      render(
        <DemoStatementItem
          question={textMockStatement.demoQuestion}
          columnTitles={textMockStatement.columnTitles}
        />
      );

      expect(
        screen.getByText(textMockStatement.demoQuestion.question)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(textMockStatement.demoQuestion.column1Question)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(textMockStatement.demoQuestion.column2Question)
      ).toBeInTheDocument();
    });

    it('Item should contain question and fire onChange event', () => {
      render(
        <StatementItem
          item={textMockStatement.item}
          columnTitles={textMockStatement.columnTitles}
          columnsNumber={textMockStatement.columns}
          onSelectAnswer={mockHandleSelectAnswer}
        />
      );

      expect(screen.getByText(textMockStatement.item.question)).toBeInTheDocument();

      checkInputTypeOnChangeEvent(mockHandleSelectAnswer);
    });

    afterEach(() => {
      mockHandleSelectAnswer.mockClear();
    });
  });

  describe('Test Audio Statement item', () => {
    const mockHandleSelectAnswer = jest.fn();

    it('Item should contain audio and fire onChange event', () => {
      render(
        <StatementItem
          item={audioMockStatement.item}
          columnTitles={audioMockStatement.columnTitles}
          columnsNumber={audioMockStatement.columns}
          onSelectAnswer={mockHandleSelectAnswer}
        />
      );

      expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();

      checkInputTypeOnChangeEvent(mockHandleSelectAnswer);
    });

    afterEach(() => {
      mockHandleSelectAnswer.mockClear();
    });
  });
});
