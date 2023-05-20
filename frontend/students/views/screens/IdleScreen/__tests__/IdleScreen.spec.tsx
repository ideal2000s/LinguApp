import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IdleScreen from '../IdleScreen';
import { lessonDataMock, lessonNullMock } from './__mocks__';

const isIdle = jest.fn();
jest.mock('students/views/shared/components/HeartBeat', () => {
  return {
    useHeartBeatChangeOptions: ({ onIdle }: { onIdle: () => void }) => {
      isIdle.mockImplementation(() => onIdle());
    },
    useHeartBeatContextApi: () => {}
  };
});
const onExit = jest.fn();

afterEach(() => {
  onExit.mockClear();
});

describe('<IdleScreen />', () => {
  describe('when lesson is null', () => {
    beforeEach(() => {
      render(<IdleScreen lesson={lessonNullMock} onExit={onExit} />);
      act(() => isIdle());
    });

    checkDefaultElementsPresence();
    checkOnExitHandler();

    checkIdleScreenClosesOnContinue();
  });

  describe('when lesson data is passed', () => {
    beforeEach(() => {
      render(<IdleScreen lesson={lessonDataMock} onExit={onExit} />);
      act(() => isIdle());
    });

    checkDefaultElementsPresence();

    it('should display lesson title', async () => {
      expect(screen.getByText(lessonDataMock.title)).toBeInTheDocument();
    });
    it('should display author name', async () => {
      expect(screen.getByText(`by ${lessonDataMock.author?.name}`)).toBeInTheDocument();
    });
    checkOnExitHandler();

    checkIdleScreenClosesOnContinue();
  });
});

function checkDefaultElementsPresence() {
  it('should display idle message', async () => {
    expect(
      screen.getByRole('heading', { name: /You’ve been idle for some time/ })
    ).toBeInTheDocument();
  });
  it('should display Continue button', async () => {
    expect(screen.getByRole('button', { name: /Continue/ })).toBeInTheDocument();
  });
  it('should display Exit button', async () => {
    expect(screen.getByRole('button', { name: /Exit/ })).toBeInTheDocument();
  });
}

function checkIdleScreenClosesOnContinue() {
  describe('when continue button clicked', () => {
    it('should close idle screen', async () => {
      const continueButton = screen.getByRole('button', { name: /Continue/ });
      userEvent.click(continueButton);

      await waitFor(() =>
        expect(
          screen.queryByRole('heading', { name: /You’ve been idle for some time/ })
        ).not.toBeInTheDocument()
      );
    });
  });
}

function checkOnExitHandler() {
  describe('when exit is clicked', () => {
    it('onExit should be called', async () => {
      const exitButton = screen.getByRole('button', { name: /Exit/ });
      userEvent.click(exitButton);

      expect(onExit).toBeCalledTimes(1);
    });
  });
}
