import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InlineDropdownItem from '../InlineDropdownItem';
import { mockItem } from './__mocks__/PlayInlineDropdownItemMock';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

describe('<InlineDropdownItem />', () => {
  const mockHandleSelectAnswer = jest.fn();
  const mockHandleItemFinished = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    render(
      <InlineDropdownItem
        item={mockItem}
        onSelectAnswer={mockHandleSelectAnswer}
        onItemFinished={mockHandleItemFinished}
      />
    );
  });

  afterEach(() => {
    mockHandleSelectAnswer.mockClear();
    mockHandleItemFinished.mockClear();
  });

  it('Component should contains statement', () => {
    const statementParts = mockItem.statement.split('**');
    statementParts.forEach((statementPart) => {
      if ('' !== statementPart.trim()) {
        expect(screen.getByText(new RegExp(statementPart.trim()))).toBeInTheDocument();
      }
    });
  });

  it('Component should fire change event when answer is specified', () => {
    const selectAnswerButtons = screen.getAllByRole('button', { name: '•••' });

    selectAnswerButtons.forEach((selectAnswerButton, index) => {
      userEvent.click(selectAnswerButton);

      const selectedOption = screen.getByText(mockItem.solution[index]);
      userEvent.click(selectedOption);

      expect(mockHandleSelectAnswer).toHaveBeenCalledTimes(index + 1);
      expect(mockHandleSelectAnswer).toHaveBeenLastCalledWith({
        attemptsCount: 0,
        itemId: mockItem.id,
        value: mockItem.solution[index],
        wordIndex: index
      });
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(mockHandleItemFinished).toHaveBeenCalledTimes(1);
  });
});
