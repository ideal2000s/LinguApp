import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import CheckMultipleChoiceTask from '../CheckMultipleChoiceTask';
import { mockTask } from './__mocks__/CheckMultipleChoiceTaskMock';

describe('<CheckInlineDropdownTask />', () => {
  const mockHandleNext = jest.fn();
  const mockHandleSkip = jest.fn();

  beforeEach(() => {
    render(
      <CheckMultipleChoiceTask
        isCompleting={false}
        task={mockTask}
        onNext={mockHandleNext}
        onSkip={mockHandleSkip}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('Component should contains title', () => {
    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
  });

  it('Component should contains all items', () => {
    mockTask.items.forEach((item) => {
      expect(screen.getByText(new RegExp(item.question.trim()))).toBeInTheDocument();
    });
  });
});
