import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxOptionItem from '../CheckboxOptionItem';
import { mockOption } from './__mocks__/CheckboxOptionItemMock';

describe('<CheckboxOptionItem />', () => {
  const mockHandleCheckboxChange = jest.fn();

  beforeEach(() => {
    render(
      <CheckboxOptionItem
        option={mockOption}
        onCheckboxChange={mockHandleCheckboxChange}
      />
    );
  });

  afterEach(() => {
    cleanup();
    mockHandleCheckboxChange.mockClear();
  });

  it('Component should fire change event when checkbox is checked', () => {
    const checkbox = screen.getByLabelText(mockOption.answer.trim());
    userEvent.click(checkbox);

    expect(mockHandleCheckboxChange).toHaveBeenCalledTimes(1);
    expect(mockHandleCheckboxChange).toHaveBeenLastCalledWith(mockOption.id, false);
  });
});
