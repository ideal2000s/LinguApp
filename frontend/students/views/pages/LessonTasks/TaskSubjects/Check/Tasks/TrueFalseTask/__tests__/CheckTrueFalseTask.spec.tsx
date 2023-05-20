import React from 'react';
import { render, screen } from '@testing-library/react';
import CheckTrueFalseTask from '../CheckTrueFalseTask';
import { mockTask } from './__mocks__/CheckTrueFalseTaskMock';

describe('<CheckTrueFalseTask />', () => {
  const mockHandleNext = jest.fn();
  const mockHandleSkip = jest.fn();

  beforeEach(() => {
    render(
      <CheckTrueFalseTask
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
      expect(screen.getByText(new RegExp(item.statement.trim()))).toBeInTheDocument();
    });
  });
});
