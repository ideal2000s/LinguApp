import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import CheckInlineDropdownTask from '../CheckInlineDropdownTask';
import { mockTask } from './__mocks__/CheckInlineDropdownTaskMock';

describe('<CheckInlineDropdownTask />', () => {
  const mockHandleNext = jest.fn();
  const mockHandleSkip = jest.fn();

  beforeEach(() => {
    render(
      <CheckInlineDropdownTask
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
    expect(screen.getByText(mockTask.title.trim())).toBeInTheDocument();
  });

  it('Component should contains all items', () => {
    mockTask.items.forEach((item) => {
      const statementParts = item.statement.split('**');
      statementParts.forEach((statementPart) => {
        if ('' !== statementPart.trim()) {
          expect(screen.getByText(new RegExp(statementPart.trim()))).toBeInTheDocument();
        }
      });
    });
  });
});
