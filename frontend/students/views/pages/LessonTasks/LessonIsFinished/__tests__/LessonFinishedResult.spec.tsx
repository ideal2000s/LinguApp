import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAppProviders } from 'students/utils/testUtils';
import LessonFinishedResult from '../LessonFinishedResult';
import lessonFinishedAnswersListMock from './__mocks__/LessonFinishedAnswersListMock';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: 'localhost/lessons/1/finished'
  })),
  Link: ({ props, children }: { props: any; children: any }) => (
    <a {...props}>{children}</a>
  )
}));

describe('<LessonFinishedResult', () => {
  it('User has great result 20/21 - above 70%', () => {
    renderWithAppProviders(
      <LessonFinishedResult
        score={20}
        total={21}
        tasks={lessonFinishedAnswersListMock.tasks}
      />
    );

    expect(
      screen.getByRole('heading', { name: /well done! these are great results!/i })
    ).toBeInTheDocument();
  });

  it('User has good result 14/21 - between 26% and 70%', () => {
    renderWithAppProviders(
      <LessonFinishedResult
        score={14}
        total={21}
        tasks={lessonFinishedAnswersListMock.tasks}
      />
    );

    expect(
      screen.getByRole('heading', { name: /i can see you've made an effort!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/practice more and you will achieve better results next time!/i)
    ).toBeInTheDocument();
  });

  it('User has good result 1/21 - below 26%', () => {
    renderWithAppProviders(
      <LessonFinishedResult
        score={1}
        total={21}
        tasks={lessonFinishedAnswersListMock.tasks}
      />
    );

    expect(
      screen.getByRole('heading', { name: /try to take the lesson one more time/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/practice more and you will achieve better results next time!/i)
    ).toBeInTheDocument();
  });
});
