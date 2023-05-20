import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockTask } from './__mocks__/PlayAuditionTaskMock';
import PlayAuditionMainScreen from '../PlayAuditionMainScreen';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

describe('<PlayAuditionMainScreen />', () => {
  const handleComplete = jest.fn();
  const handleSelectAnswer = jest.fn();

  beforeEach(() => {
    render(
      <PlayAuditionMainScreen
        task={mockTask}
        onComplete={handleComplete}
        onSelectAnswer={handleSelectAnswer}
      />
    );
  });

  afterEach(() => {
    handleComplete.mockClear();
    handleSelectAnswer.mockClear();
  });

  it('Should call onComplete after last item is skipped', async () => {
    const skipName = /skip/i;
    await screen.findByRole('button', { name: skipName }, { timeout: 3000 });
    userEvent.click(screen.getByRole('button', { name: skipName }));
    expect(handleComplete).toBeCalledTimes(0);

    await screen.findByRole('button', { name: skipName }, { timeout: 3000 });
    userEvent.click(screen.getByRole('button', { name: skipName }));

    expect(handleComplete).toBeCalledTimes(1);
  });
});
