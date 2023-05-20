import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockItem } from './__mocks__/MinimalPairsItemMock';
import MinimalPairsItem from '../MinimalPairsItem';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

jest.mock('students/views/shared/components/MediaPlayer', () => ({
  VideoPlayer: jest.fn(({ onEnded, url }) => {
    setTimeout(onEnded, 500);
    return <div>{url}</div>;
  })
}));

describe('<MinimalPairsItem />', () => {
  const mockHandleSelectAnswer = jest.fn();

  beforeEach(() => {
    render(<MinimalPairsItem item={mockItem} onSelectAnswer={mockHandleSelectAnswer} />);
  });

  afterEach(() => {
    mockHandleSelectAnswer.mockClear();
  });

  it('Component should contains correct video url', async () => {
    await waitFor(() => expect(screen.getByText(mockItem.videoURL)).toBeInTheDocument());
  });

  it('Component should contains all options', async () => {
    await waitFor(() => {
      mockItem.options.forEach((option) => {
        expect(screen.getByText(option.answer)).toBeInTheDocument();
      });
    });
  });

  it('Component should fire select event when answer is correct', async () => {
    const { options } = mockItem;
    const correctAnswer = options.find((option) => option.correct);
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: correctAnswer?.answer })
      ).toBeInTheDocument()
    );
    userEvent.click(screen.getByRole('button', { name: correctAnswer?.answer }));
    await waitFor(() => expect(mockHandleSelectAnswer).toHaveBeenCalledTimes(1), {
      timeout: 3000
    });
  });
});
