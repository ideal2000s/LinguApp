import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArrangeWordsItem from '../components/ArrangeWordsItem';
import { mockItem } from './__mocks__/ArrangeWordsItemMock';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

describe('<ArrangeWordsItem />', () => {
  const mockHandleSelectAnswer = jest.fn();
  const mockHandleSelectWord = jest.fn();

  beforeEach(() => {
    render(
      <ArrangeWordsItem
        item={mockItem}
        onSelectAnswer={mockHandleSelectAnswer}
        onSelectWord={mockHandleSelectWord}
      />
    );
  });

  afterEach(() => {
    mockHandleSelectAnswer.mockClear();
    mockHandleSelectWord.mockClear();
  });

  it('Component should contains description', () => {
    expect(screen.getByText(mockItem.description.trim())).toBeInTheDocument();
  });

  it('Component should contains all words', () => {
    mockItem.words.forEach((word) => {
      expect(screen.getByRole('button', { name: word })).toBeInTheDocument();
    });
  });

  it('Component should fire change event when answer is correct', () => {
    const words = mockItem.solution.split(' ');

    words.forEach((word, index) => {
      const wordButton = screen.getByRole('button', { name: word });
      userEvent.click(wordButton);

      expect(mockHandleSelectWord).toHaveBeenCalledTimes(index + 1);
      expect(mockHandleSelectWord).toHaveBeenLastCalledWith(
        mockItem.words.findIndex((item) => item === word)
      );
    });

    expect(screen.getByText(mockItem.solution.trim())).toBeInTheDocument();
  });
});
