import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockTask } from './__mocks__/MinimalPairsTaskMock';
import PlayMinimalPairsTask from '../PlayMinimalPairsTask';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

jest.mock('students/views/shared/components/MediaPlayer', () => ({
  VideoPlayer: jest.fn(({ onEnded, url }) => {
    setTimeout(onEnded, 500);
    return <div>{url}</div>;
  })
}));

jest.setTimeout(15000);

async function startTask() {
  userEvent.click(screen.getByRole('button', { name: /start/i }));

  await waitForElementToBeRemoved(screen.queryByRole('button', { name: /start/i }), {
    timeout: 3000
  });
}

describe('<PlayMinimalPairsTask />', () => {
  beforeEach(() => {
    render(<PlayMinimalPairsTask isCompleting={false} task={mockTask} />);
  });

  it('Should display start screen with start button', async () => {
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('Should show first item screen and pass correct video url', async () => {
    await startTask();
    await waitFor(() =>
      expect(screen.getByText(mockTask.items[0].videoURL)).toBeInTheDocument()
    );
  });

  it('Should show final screen after the last item screen', async () => {
    await startTask();
    const { items } = mockTask;
    await waitFor(() => expect(screen.getByText(items[0].videoURL)).toBeInTheDocument());
    userEvent.click(screen.getByRole('button', { name: /skip/i }));
    await waitFor(() => expect(screen.getByText(items[1].videoURL)).toBeInTheDocument());
    userEvent.click(screen.getByRole('button', { name: /skip/i }));
    await screen.findByRole('button', { name: /finish/i });
  });
});
