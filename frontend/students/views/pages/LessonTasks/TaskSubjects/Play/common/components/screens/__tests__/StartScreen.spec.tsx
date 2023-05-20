import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StartScreen from '../StartScreen';
import { mockHeading } from './__mocks__/StartScreenMock';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

describe('<StartScreen />', () => {
  const mockHandleStart = jest.fn();

  beforeEach(() => {
    render(
      <StartScreen isCompleting={false} heading={mockHeading} onStart={mockHandleStart} />
    );
  });

  afterEach(() => {
    mockHandleStart.mockClear();
  });

  it('Component should contains title', () => {
    expect(screen.getByText(mockHeading)).toBeInTheDocument();
  });

  it('Component should contains "Start" button', () => {
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });

  it('Component should fire change event after click on "Start" button', async () => {
    const startButton = screen.getByRole('button', { name: 'Start' });
    userEvent.click(startButton);

    await waitFor(
      () => {
        expect(mockHandleStart).toHaveBeenCalledTimes(1);
      },
      {
        timeout: 3000
      }
    );
  });
});
