import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react/pure';
import userEvent from '@testing-library/user-event';
import PlayTaskScreenSwitcher from '../PlayTaskScreenSwitcher';

//NOTE this test uses @testing-library/react/pure and that's why cleanup is needed

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

describe('<PlayTaskScreenSwitcher />', () => {
  const mockHandleExitFinishScreen = jest.fn();
  const startScreenHeading = 'Start screen heading';
  const finishTaskButtonName = 'Go to finish';
  beforeAll(() => {
    render(
      <PlayTaskScreenSwitcher
        startScreenHeading={startScreenHeading}
        onExitFinishScreen={mockHandleExitFinishScreen}
        itemsExist={true}
      >
        {(goToFinish) => <button onClick={goToFinish}>{finishTaskButtonName}</button>}
      </PlayTaskScreenSwitcher>
    );
  });

  afterAll(() => {
    cleanup();
    mockHandleExitFinishScreen.mockClear();
  });

  it('Should show start screen with heading first ', async () => {
    await screen.findByText(startScreenHeading);
  });

  it('Should show main screen when start is clicked', async () => {
    await screen.findByRole('button', { name: /start/i });
    userEvent.click(screen.getByRole('button', { name: /start/i }));

    await screen.findByRole('button', { name: finishTaskButtonName }, { timeout: 4000 });
  });

  it('Should show final screen when main screen is finished', async () => {
    userEvent.click(screen.getByRole('button', { name: finishTaskButtonName }));

    await screen.findByRole('button', { name: /finish/i });
  });

  it('Should call onExitFinishScreen from finish screen', async () => {
    expect(mockHandleExitFinishScreen).not.toBeCalled();
    userEvent.click(screen.getByRole('button', { name: /finish/i }));

    await waitFor(
      () => {
        expect(mockHandleExitFinishScreen).toBeCalledTimes(1);
      },
      { timeout: 3000 }
    );
  });
});
