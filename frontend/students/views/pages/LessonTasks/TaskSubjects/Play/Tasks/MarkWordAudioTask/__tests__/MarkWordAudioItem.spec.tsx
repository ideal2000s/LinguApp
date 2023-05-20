import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IMarkWordAudioItemStatement } from 'students/models/lessonTasks';
import MarkWordAudioItem from '../MarkWordAudioItem';
import { mockItem } from './__mocks__/MarkWordAudioItemMock';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

describe('<MarkWordAudioItem />', () => {
  const mockHandleSelectAnswer = jest.fn();

  beforeEach(() => {
    render(<MarkWordAudioItem item={mockItem} onSelectItem={mockHandleSelectAnswer} />);
  });

  afterEach(() => {
    mockHandleSelectAnswer.mockClear();
  });

  it('Component should contain statement', () => {
    mockItem.statement.forEach((statementPart: IMarkWordAudioItemStatement) => {
      if (statementPart.word.trim() !== '') {
        screen
          .getAllByText(new RegExp(statementPart.word.trim()))
          .forEach((word) => expect(word).toBeInTheDocument());
      }
    });
  });

  it('Component should fire change event when user click on all correct words in the item', async () => {
    const solution = mockItem.statement.find(
      (statementPart: IMarkWordAudioItemStatement) => statementPart.solution
    ) || { word: '' };

    const correctAnswerButton = screen.getByText(solution.word);
    userEvent.click(correctAnswerButton);

    await waitFor(
      () => {
        expect(mockHandleSelectAnswer).toHaveBeenCalledTimes(1);
        expect(mockHandleSelectAnswer).toHaveBeenLastCalledWith({
          attemptsCount: 0,
          itemId: mockItem.id,
          solution: [solution.word]
        });
      },
      { timeout: 5000 }
    );
  });

  it('Component should not fire change event when user click on wrong word', async () => {
    const incorrectAnswerButton = screen.getByText(mockItem.statement[0].word);
    userEvent.click(incorrectAnswerButton);

    await waitFor(
      () => {
        expect(mockHandleSelectAnswer).toHaveBeenCalledTimes(0);
      },
      { timeout: 5000 }
    );
  });
});
