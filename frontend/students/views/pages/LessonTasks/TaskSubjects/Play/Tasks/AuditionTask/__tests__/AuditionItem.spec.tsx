import React from 'react';
import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuditionItem from '../components/AuditionItem';
import { mockTask } from './__mocks__/PlayAuditionTaskMock';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

describe('<AuditionItem />', () => {
  const mockHandleSelectAnswer = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    render(
      <AuditionItem
        audioUrl={mockTask.audioURL}
        item={mockTask.items[0]}
        onSelectAnswer={mockHandleSelectAnswer}
        initiallyShowOptions={true}
      />
    );
  });

  afterEach(() => {
    mockHandleSelectAnswer.mockClear();
  });

  it('Component should contains waveform audio player', () => {
    expect(
      screen.getAllByText(
        (content, element) => element?.tagName?.toLowerCase() === 'wave'
      )[0]
    ).toBeInTheDocument();
  });

  it('Component should contains all words', async () => {
    for (const word of mockTask.items[0].words) {
      await screen.findByText(word.body);
    }
    expect(mockHandleSelectAnswer).toBeCalledTimes(0);
  });

  it('Component should fire change event when answer is correct', () => {
    const correctWordBlock = screen.getByText(mockTask.items[0].correctWord.body);
    userEvent.click(correctWordBlock);

    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(mockHandleSelectAnswer).toBeCalledTimes(1);
  });

  it('Component should show error screen when wrong answer is selected 3 times', async () => {
    userEvent.click(screen.getByText(mockTask.items[0].words[0].body));
    userEvent.click(screen.getByText(mockTask.items[0].words[1].body));
    userEvent.click(screen.getByText(mockTask.items[0].words[2].body));

    await waitForElementToBeRemoved(screen.queryByText(mockTask.items[0].words[0].body), {
      timeout: 2000
    });
    expect(screen.getByText(mockTask.items[0].correctWord.body)).toBeInTheDocument();
  });
});
