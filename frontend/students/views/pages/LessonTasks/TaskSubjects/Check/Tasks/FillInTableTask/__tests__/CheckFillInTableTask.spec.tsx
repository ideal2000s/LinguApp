import React from 'react';
import { render, screen } from '@testing-library/react';
import { IFillInTableItem } from 'students/models/lessonTasks';

import CheckFillInTableTask from '../CheckFillInTableTask';
import { mockTask } from './__mocks__/CheckFillInTableTaskMock';

describe('<CheckFillInTableTask />', () => {
  const mockHandleNext = jest.fn();
  const mockHandleSkip = jest.fn();

  beforeEach(() => {
    render(
      <CheckFillInTableTask
        isCompleting={false}
        task={mockTask}
        onNext={mockHandleNext}
        onSkip={mockHandleSkip}
      />
    );
  });

  it('Component should contain title', () => {
    expect(screen.getByText(mockTask.title.trim())).toBeInTheDocument();
  });

  it('Component should contain all items', () => {
    mockTask.items.forEach((item: IFillInTableItem) => {
      expect(screen.getByText(new RegExp(item.question.trim()))).toBeInTheDocument();
    });
  });
});
