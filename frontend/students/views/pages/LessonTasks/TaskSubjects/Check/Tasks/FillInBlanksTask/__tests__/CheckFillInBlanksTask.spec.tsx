import React from 'react';
import { render, screen } from '@testing-library/react';
import CheckFillInBlanksTask from '../CheckFillInBlanksTask';
import { mockTask } from './__mocks__/CheckFillInBlanksTaskMock';

describe('<CheckFillInBlanksTask />', () => {
  const mockHandleNext = jest.fn();
  const mockHandleSkip = jest.fn();

  beforeEach(() => {
    render(
      <CheckFillInBlanksTask
        isCompleting={false}
        task={mockTask}
        onNext={mockHandleNext}
        onSkip={mockHandleSkip}
      />
    );
  });

  it('Component should contains title', () => {
    expect(screen.getByText(mockTask.title.trim())).toBeInTheDocument();
  });

  it('Component should contains all items', () => {
    mockTask.items.forEach((item) => {
      const questionParts = item.question.split('**');
      questionParts.forEach((questionPart) => {
        if ('' !== questionPart.trim()) {
          expect(screen.getByText(new RegExp(questionPart.trim()))).toBeInTheDocument();
        }
      });
    });
  });
});
