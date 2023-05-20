import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayImageHotspotTask from '../PlayImageHotspotTask';
import { mockTask } from './__mocks__/PlayImageHotspotTaskMock';
import { renderWithAppProviders } from 'students/utils/testUtils';

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

describe('<PlayImageHotspotTask />', () => {
  const mockHandleFinish = jest.fn();

  beforeEach(() => {
    renderWithAppProviders(
      <PlayImageHotspotTask
        isCompleting={false}
        task={mockTask}
        onFinish={mockHandleFinish}
      />
    );
  });

  afterEach(() => {
    mockHandleFinish.mockClear();
  });

  it('Should display start screen with start button', async () => {
    await screen.findByRole('button', { name: /start/i });
  });

  it('Should go from first to the second item screen after clicking skip button', async () => {
    await startTask();
    userEvent.click(screen.getByRole('button', { name: /skip/i }));
  });

  it('Should show final screen after the last item screen', async () => {
    await startTask();
    userEvent.click(screen.getByRole('button', { name: /skip/i }));
    userEvent.click(screen.getByRole('button', { name: /skip/i }));

    await screen.findByRole('button', { name: /finish/i }, { timeout: 3000 });
  });
});
