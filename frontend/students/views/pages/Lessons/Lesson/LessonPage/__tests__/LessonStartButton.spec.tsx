import React from 'react';
import { screen } from '@testing-library/react';
import LessonStartButtons from '../LessonStartButtons';
import { tShowActionButtons } from '../LessonPageContainer';
import {
  hideStatus,
  startStatus,
  continueStatus
} from './__mocks__/LessonStartButtonMock';
import { renderWithAppProviders } from 'students/utils/testUtils';

describe('<LessonStartButtons />', () => {
  const mockStartLesson = jest.fn();
  const mockRestartLesson = jest.fn();

  const customizedRender = (status: tShowActionButtons) =>
    renderWithAppProviders(
      <LessonStartButtons
        status={status}
        startLesson={mockStartLesson}
        restartLesson={mockRestartLesson}
        startLessonIsLoading={false}
      />
    );

  it('Component should contain start button', () => {
    customizedRender(startStatus);

    const startButton = screen.getByRole('button', { name: /start lesson/i });
    expect(startButton).toBeInTheDocument();
  });

  it('Component should contain continue lesson button or restart', () => {
    customizedRender(continueStatus);

    const continueBtn = screen.getByRole('button', { name: /continue lesson/i });
    const restartBtn = screen.getByRole('button', { name: /restart/i });

    expect(continueBtn).toBeInTheDocument();
    expect(restartBtn).toBeInTheDocument();
  });

  it('Component should not have any buttons', () => {
    customizedRender(hideStatus);

    const startBtn = screen.queryByRole('button', { name: /start lesson/i });
    const continueBtn = screen.queryByRole('button', { name: /continue lesson/i });
    const restartBtn = screen.queryByRole('button', { name: /restart/i });

    expect(startBtn).not.toBeInTheDocument();
    expect(restartBtn).not.toBeInTheDocument();
    expect(continueBtn).not.toBeInTheDocument();
  });
});
