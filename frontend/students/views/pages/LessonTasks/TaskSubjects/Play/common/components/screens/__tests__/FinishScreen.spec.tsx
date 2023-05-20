import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FinishScreen from '../FinishScreen';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

describe('<FinishScreen />', () => {
  const mockHandleComplete = jest.fn();

  beforeEach(() => {
    render(<FinishScreen isCompleting={false} onFinish={mockHandleComplete} />);
  });

  afterEach(() => {
    mockHandleComplete.mockClear();
  });

  it('Component should contains "Finish" button', () => {
    expect(screen.getByRole('button', { name: 'Finish' })).toBeInTheDocument();
  });

  it('Component should fire change event after click on "Finish" button', () => {
    const finishButton = screen.getByRole('button', { name: 'Finish' });
    userEvent.click(finishButton);

    expect(mockHandleComplete).toHaveBeenCalledTimes(1);
  });
});
