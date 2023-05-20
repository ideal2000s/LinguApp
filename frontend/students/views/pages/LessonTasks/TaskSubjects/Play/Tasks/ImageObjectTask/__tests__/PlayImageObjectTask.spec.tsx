import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayImageObjectTask from '../PlayImageObjectTask';
import { mockHeading, mockTask } from './__mocks__/PlayImageObjectTaskMock';
import { renderWithAppProviders } from 'students/utils/testUtils';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

jest.setTimeout(10000);

async function startTask() {
  await screen.findByRole('button', { name: /start/i });
  userEvent.click(screen.getByRole('button', { name: /start/i }));

  await waitForElementToBeRemoved(screen.queryByRole('button', { name: /start/i }), {
    timeout: 2000
  });
}

describe('<PlayImageObjectTask />', () => {
  const mockHandleFinish = jest.fn();

  beforeEach(() => {
    renderWithAppProviders(
      <PlayImageObjectTask
        isCompleting={false}
        task={mockTask}
        onFinish={mockHandleFinish}
      />
    );
  });

  afterEach(() => {
    mockHandleFinish.mockClear();
  });

  it('Component should contains title', () => {
    expect(screen.getByText(mockHeading)).toBeInTheDocument();
  });

  it('Should display start screen with start button', async () => {
    await screen.findByRole('button', { name: /start/i });
  });

  it('Should show first item screen after pressing the start button', async () => {
    await startTask();
  });

  it('Should go from first to the second item screen after clicking skip button', async () => {
    await startTask();
    userEvent.click(screen.getByRole('button', { name: /skip/i }));
  });

  it('Should show final screen after the last item screen', async () => {
    await startTask();
    userEvent.click(screen.getByRole('button', { name: /skip/i }));
    userEvent.click(screen.getByRole('button', { name: /skip/i }));
    userEvent.click(screen.getByRole('button', { name: /skip/i }));

    await screen.findByRole('button', { name: /finish/i });
  });
});
