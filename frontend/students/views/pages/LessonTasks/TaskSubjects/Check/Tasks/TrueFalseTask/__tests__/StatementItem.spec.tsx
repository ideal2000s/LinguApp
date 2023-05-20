import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StatementItem from '../StatementItem';
import { mockStatement } from './__mocks__/StatementItemMock';

describe('<StatementItem />', () => {
  const mockHandleSelectAnswer = jest.fn();

  beforeEach(() => {
    render(
      <StatementItem options={mockStatement} onSelectAnswer={mockHandleSelectAnswer} />
    );
  });

  afterEach(() => {
    mockHandleSelectAnswer.mockClear();
  });

  it('Component should contains statement', () => {
    expect(screen.getByText(mockStatement.statement)).toBeInTheDocument();
  });

  it('Component should fire change event when "Check" button is clicked', () => {
    const trueButton = screen.getByRole('checkbox', { checked: true });
    userEvent.click(trueButton);

    expect(mockHandleSelectAnswer).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectAnswer).toHaveBeenLastCalledWith({
      itemId: mockStatement.itemId,
      value: true
    });
  });

  it('Component should fire change event when "Cross" button is clicked', () => {
    const falseButton = screen.getByRole('checkbox', { checked: false });
    userEvent.click(falseButton);

    expect(mockHandleSelectAnswer).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectAnswer).toHaveBeenLastCalledWith({
      itemId: mockStatement.itemId,
      value: false
    });
  });
});
