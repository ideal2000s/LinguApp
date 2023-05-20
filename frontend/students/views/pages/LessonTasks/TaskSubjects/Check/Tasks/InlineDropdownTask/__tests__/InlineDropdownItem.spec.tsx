import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InlineDropdownItem from '../InlineDropdownItem';
import { mockItem } from './__mocks__/CheckInlineDropdownItemMock';

describe('<InlineDropdownItem />', () => {
  const mockHandleSelectAnswer = jest.fn();

  beforeEach(() => {
    render(
      <InlineDropdownItem item={mockItem} onSelectAnswer={mockHandleSelectAnswer} />
    );
  });

  afterEach(() => {
    mockHandleSelectAnswer.mockClear();
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

      const selectedOption = screen.getByText(mockItem.answers[index][0]);
      userEvent.click(selectedOption);

      expect(mockHandleSelectAnswer).toHaveBeenCalledTimes(index + 1);
      expect(mockHandleSelectAnswer).toHaveBeenLastCalledWith({
        value: mockItem.answers[index][0],
        wordIndex: index,
        itemId: mockItem.id
      });
    });
  });
});
