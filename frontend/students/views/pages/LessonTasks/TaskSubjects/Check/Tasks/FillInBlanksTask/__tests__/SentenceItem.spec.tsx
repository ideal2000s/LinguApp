import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import SentenceItem from '../SentenceItem';
import { mockItem } from './__mocks__/SentenceItemMock';

describe('<SentenceItem />', () => {
  const mockHandleSelectAnswer = jest.fn();

  beforeEach(() => {
    render(<SentenceItem options={mockItem} onSelectAnswer={mockHandleSelectAnswer} />);
  });

  afterEach(() => {
    cleanup();
    mockHandleSelectAnswer.mockClear();
  });

  it('Component should contains sentence', () => {
    const sentenceParts = mockItem.sentence.split('**');
    sentenceParts.forEach((sentencePart) => {
      if ('' !== sentencePart.trim()) {
        expect(screen.getByText(new RegExp(sentencePart.trim()))).toBeInTheDocument();
      }
    });
  });

  it('Component should fire change event after data has been filled to the input field', () => {
    const answerInputs = screen.getAllByRole('textbox');
    answerInputs.forEach((answerInput, index) => {
      const value = Math.random().toString();

      fireEvent.change(answerInput, { target: { value } });

      expect(mockHandleSelectAnswer).toHaveBeenCalledTimes(index + 1);
      expect(mockHandleSelectAnswer).toHaveBeenLastCalledWith({
        value,
        itemId: mockItem.id,
        wordIndex: index
      });
    });
  });
});
