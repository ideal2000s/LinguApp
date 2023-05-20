import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RadioOptionItem from '../RadioOptionItem';
import { mockOption } from './__mocks__/RadioOptionItemMock';

describe('<RadioOptionItem />', () => {
  const mockHandleRadioChange = jest.fn();

  beforeEach(() => {
    render(<RadioOptionItem option={mockOption} onRadioChange={mockHandleRadioChange} />);
  });

  afterEach(() => {
    cleanup();
    mockHandleRadioChange.mockClear();
  });

  it('Component should fire change event when radio is selected', () => {
    const radio = screen.getByLabelText(mockOption.answer.trim());
    userEvent.click(radio);

    expect(mockHandleRadioChange).toHaveBeenCalledTimes(1);
    expect(mockHandleRadioChange).toHaveBeenLastCalledWith(mockOption.id, true);
  });
});
