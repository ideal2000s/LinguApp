import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockTask } from './__mocks__/PlayArrangeWordsTaskMock';
import PlayArrangeWordsMainScreen from '../PlayArrangeWordsMainScreen';
import { IPlayArrangeWordsItem } from 'students/models/lessonTasks';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

jest.setTimeout(15000);

async function waitItemWords(item: IPlayArrangeWordsItem) {
  await waitFor(
    () => {
      for (const word of item.words) {
        screen.getByRole('button', { name: word });
      }
    },
    { timeout: 3000 }
  );
}

describe('<PlayArrangeWordsMainScreen />', () => {
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
      <PlayArrangeWordsMainScreen
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

  it('Should display first item description and item words', async () => {
    await screen.findByText(mockTask.items[0].description, undefined, { timeout: 3000 });
    await waitItemWords(mockTask.items[0]);
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

  it('Should show item result screen once the correct sentence is built', async () => {
    const correctWords = mockTask.items[0].solution.split(' ');
    await screen.findByText(mockTask.items[0].description, undefined, { timeout: 3000 });
    expect(handleSelectAnswer).toBeCalledTimes(0);

    for (const word of correctWords) {
      await screen.findByRole('button', { name: word });
      act(() => userEvent.click(screen.getByRole('button', { name: word })));
    }
    await waitFor(
      () => {
        expect(handleSelectAnswer).toBeCalledTimes(1);
      },
      { timeout: 3000 }
    );

    await screen.findByText(mockTask.items[0].solution, undefined, { timeout: 2000 });
  });
});
