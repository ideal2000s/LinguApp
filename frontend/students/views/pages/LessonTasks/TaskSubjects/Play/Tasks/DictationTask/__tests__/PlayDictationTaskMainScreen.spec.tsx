import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockTask } from './__mocks__/PlayDictationTaskMock';
import PlayDictationMainScreen from '../PlayDictationTaskMainScreen';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

jest.setTimeout(15000);

describe('<PlayDictationMainScreen />', () => {
  const handleComplete = jest.fn();
  const handleSelectAnswer = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    render(
      <PlayDictationMainScreen
        task={mockTask}
        onComplete={handleComplete}
        onSelectAnswer={handleSelectAnswer}
      />
    );
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  });

  afterEach(() => {
    handleComplete.mockClear();
    handleSelectAnswer.mockClear();
  });

  it('Should call onComplete after last item is skipped', async () => {
    const skipName = /skip/i;
    await screen.findByRole('button', { name: skipName }, { timeout: 3000 });
    userEvent.click(screen.getByRole('button', { name: skipName }));
    expect(handleComplete).toBeCalledTimes(0);

    await screen.findByRole('button', { name: skipName }, { timeout: 3000 });
    userEvent.click(screen.getByRole('button', { name: skipName }));

    expect(handleComplete).toBeCalledTimes(1);
  });
});
