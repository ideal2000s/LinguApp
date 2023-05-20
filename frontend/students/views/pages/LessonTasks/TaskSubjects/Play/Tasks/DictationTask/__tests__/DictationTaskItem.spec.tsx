import { waitFor } from '@testing-library/react/pure';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { t } from 'i18n';

import DictationTaskItem from '../components/DictationTaskItem';
import { mockItem } from './__mocks__/DictationTaskItemMock';

jest.mock('students/utils', () => ({
  playCorrectSound: jest.fn(),
  playIncorrectSound: jest.fn()
}));

describe('<DictationTaskItem />', () => {
  const mockHandleSelectAnswer = jest.fn();
  const mockGoToWrongAnswerScreen = jest.fn();

  beforeEach(() => {
    render(
      <DictationTaskItem
        item={mockItem}
        characters={['a', 'b', 'c']}
        onSelectAnswer={mockHandleSelectAnswer}
        goToWrongAnswerScreen={mockGoToWrongAnswerScreen}
      />
    );
  });

  afterEach(() => {
    mockHandleSelectAnswer.mockClear();
    mockGoToWrongAnswerScreen.mockClear();
  });

  it('Component should contain SVG Audio player', () => {
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('Component should contain special characters', () => {
    ['a', 'b', 'c'].forEach((character) => {
      expect(screen.getByRole('button', { name: character })).toBeInTheDocument();
    });
  });

  it('Component should fire change event when answer is correct', async () => {
    const textarea = screen.getByRole('textbox', {
      name: t('frontend.lesson_task.tasks.play.dictation.input_placeholder')
    });

    userEvent.type(textarea, mockItem.sentence);

    await waitFor(
      () => {
        expect(mockHandleSelectAnswer).toHaveBeenCalledTimes(1);
        expect(mockHandleSelectAnswer).toHaveBeenLastCalledWith({
          attemptsCount: 0,
          itemId: mockItem.id
        });
      },
      { timeout: 5000 }
    );
  });

  it('Component should fire change event when answer is incorrect', async () => {
    const textarea = screen.getByRole('textbox', {
      name: t('frontend.lesson_task.tasks.play.dictation.input_placeholder')
    });
    userEvent.type(textarea, 'Incorrect answer');
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });

    await waitFor(
      () => {
        expect(mockGoToWrongAnswerScreen).toHaveBeenCalledTimes(1);
      },
      { timeout: 5000 }
    );
  });
});
