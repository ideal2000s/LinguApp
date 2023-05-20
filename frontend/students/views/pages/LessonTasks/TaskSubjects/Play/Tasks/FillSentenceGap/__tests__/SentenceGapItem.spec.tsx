import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockItem } from './__mocks__/SentenceGapItemMock';
import SentenceGapItem from '../components/SentenceGapItem';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));
const mockHandleSelectAnswer = jest.fn();

describe('<SentenceGapItem />', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    render(<SentenceGapItem item={mockItem} onSelectAnswer={mockHandleSelectAnswer} />);
  });

  afterEach(() => {
    mockHandleSelectAnswer.mockClear();
  });

  it('Component should contain statement', async () => {
    const statementParts = mockItem.statement.split('**');

    for (const statementPart of statementParts) {
      if (statementPart.trim() === '') break;
      await screen.findByText(new RegExp(statementPart.trim()));
    }
  });

  it('Component should show result screen when correct answer is selected', async () => {
    const answerButton = screen.getByRole('button', { name: mockItem.solution[0] });
    userEvent.click(answerButton);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    await waitFor(() => {
      expect(mockHandleSelectAnswer).toHaveBeenCalledTimes(1);
      expect(mockHandleSelectAnswer).toHaveBeenLastCalledWith({
        attemptsCount: 0,
        itemId: mockItem.id
      });
    });
  });

  it('Component should not fire event when incorrect answer is selected', async () => {
    const answerButton = screen.getByRole('button', { name: mockItem.answers[0][1] });
    userEvent.click(answerButton);
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    await waitFor(
      () => {
        expect(screen.getByRole('button', { name: mockItem.answers[0][1] })).toHaveClass(
          'wrongAnimation'
        );
      },
      { timeout: 1000 }
    );

    expect(mockHandleSelectAnswer).not.toBeCalled();
  });
});
