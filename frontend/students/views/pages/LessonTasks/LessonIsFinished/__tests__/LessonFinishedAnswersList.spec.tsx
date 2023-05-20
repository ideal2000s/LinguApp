import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAppProviders } from 'students/utils/testUtils';
import LessonFinishedAnswersList from '../LessonFinishedAnswersList';
import lessonFinishedAnswersListMock from './__mocks__/LessonFinishedAnswersListMock';
import lessonSessionMock from './__mocks__/LessonSessionMock';

jest.mock(
  'students/views/pages/LessonTasks/LessonIsFinished/helpers/loadCheckResultsHook',
  () => ({
    useLoadCheckResults: jest.fn().mockImplementation(() => ({
      isLoading: false,
      showSpinner: false,
      lessonSession: lessonSessionMock,
      sessionResults: lessonFinishedAnswersListMock
    }))
  })
);

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: 'localhost/lessons/1/finished'
  })),
  Link: ({ props, children }: { props: any; children: any }) => (
    <a {...props}>{children}</a>
  )
}));

jest.mock('students/views/shared/hooks', () => ({
  useBreakPoint: () => false
}));

describe('<LessonFinishedAnswersList/>', () => {
  beforeEach(() => {
    renderWithAppProviders(<LessonFinishedAnswersList />);
  });

  it('Component renders all tasks', () => {
    const tasks = lessonFinishedAnswersListMock.tasks.reduce(
      (acc: HTMLElement[], task) => {
        return [...acc, screen.getByRole('heading', { name: task.title })];
      },
      []
    );

    expect(tasks.length === lessonFinishedAnswersListMock.tasks.length);
  });
});
