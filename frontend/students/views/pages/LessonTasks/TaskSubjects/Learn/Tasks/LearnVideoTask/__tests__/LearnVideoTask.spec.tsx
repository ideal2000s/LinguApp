import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAppProviders } from 'students/utils/testUtils';
import LearnVideoTask from '../LearnVideoTask';
import lessonTaskMock from './__mocks__/LearnVideoTask.mock';

jest.mock('../hooks', () => ({
  useNextBtnAnimation: jest
    .fn()
    .mockImplementation(() => [{ start: jest.fn(), subscribe: jest.fn() }, jest.fn()])
}));

describe('<LearnVideoTask>', () => {
  it('Learn video task renders with a video and has next button', () => {
    renderWithAppProviders(
      <LearnVideoTask
        task={lessonTaskMock}
        onFinish={jest.fn()}
        lightFont={true}
        isCompleting={false}
      />
    );
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});
