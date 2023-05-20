import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockTask } from './__mocks__/PlayMarkWordTaskMock';
import PlayMarkWordTask from '../PlayMarkWordTask';
import { IMarkWordItem } from 'students/models/lessonTasks';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));
jest.setTimeout(10000);

async function startTask() {
  await screen.findByRole('button', { name: /start/i });
  userEvent.click(screen.getByRole('button', { name: /start/i }));

  await waitForElementToBeRemoved(screen.queryByRole('button', { name: /start/i }), {
    timeout: 2000
  });
}

async function checkItemWords(item: IMarkWordItem) {
  const statementParts = item.statement;

  for (const statementPart of statementParts) {
    const word = statementPart.word.trim();
    if (word === '') break;
    await screen.findByText(new RegExp(word));
  }
}

describe('<PlayMarkWordTask />', () => {
  beforeEach(() => {
    render(<PlayMarkWordTask isCompleting={false} task={mockTask} />);
  });

  it('Should display start screen with start button', async () => {
    await screen.findByRole('button', { name: /start/i });
  });

  it('Should show first item screen after pressing the start button', async () => {
    await startTask();

    await checkItemWords(mockTask.items[0]);
  });

  it('Should go from first to the second item screen after clicking skip button', async () => {
    await startTask();
    await checkItemWords(mockTask.items[0]);
    userEvent.click(screen.getByRole('button', { name: /skip/i }));

    await checkItemWords(mockTask.items[1]);
  });

  it('Should show final screen after the last item screen', async () => {
    await startTask();
    await checkItemWords(mockTask.items[0]);
    userEvent.click(screen.getByRole('button', { name: /skip/i }));
    await checkItemWords(mockTask.items[1]);
    userEvent.click(screen.getByRole('button', { name: /skip/i }));
    await checkItemWords(mockTask.items[2]);
    userEvent.click(screen.getByRole('button', { name: /skip/i }));

    await screen.findByRole('button', { name: /finish/i });
  });
});
