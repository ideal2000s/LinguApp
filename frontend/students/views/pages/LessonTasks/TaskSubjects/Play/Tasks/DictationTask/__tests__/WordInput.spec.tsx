import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WordInput from '../components/WordInput';

describe('<WordInput />', () => {
  const mockRef = createRef<HTMLTextAreaElement>();
  const mockAnimationRef = createRef<HTMLDivElement>();
  const mockValue = 'Some value';
  const mockOnChangeHandler = jest.fn();
  const mockHandleEnterKeyPress = jest.fn();

  beforeEach(() => {
    render(
      <WordInput
        key="123"
        ref={mockRef}
        animationRef={mockAnimationRef}
        value={mockValue}
        onChange={mockOnChangeHandler}
        onEnterKeyPress={mockHandleEnterKeyPress}
        isCorrect={false}
        isFinished={false}
        highlightHint={false}
      />
    );
  });

  afterEach(() => {
    mockOnChangeHandler.mockClear();
  });

  it('Component should contain passed value', () => {
    expect(screen.getByText(mockValue)).toBeInTheDocument();
  });

  it('Component should fire onChange event', () => {
    const input = screen.getByText(mockValue);
    userEvent.type(input, 'B');

    expect(mockOnChangeHandler).toHaveBeenCalledTimes(1);
    expect(mockOnChangeHandler).toHaveBeenCalledWith(mockValue + 'B');
  });
});
