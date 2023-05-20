import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Flashcard from '../Flashcard';
import { mockWords } from './__mocks__/FlashcardMock';
import { renderWithAppProviders } from 'students/utils/testUtils';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

jest.setTimeout(10000);

async function startGame() {
  await screen.findByRole('button', { name: /start/i });
  userEvent.click(screen.getByRole('button', { name: /start/i }));
}

describe('<Flashcard />', () => {
  const mockHandleNext = jest.fn();
  const mockHandleExit = jest.fn();
  const mockHandleRoundComplete = jest.fn();

  const checkRoundComplete = async (word: string) => {
    await waitFor(() =>
      expect(mockHandleRoundComplete).toHaveBeenCalledWith(
        expect.objectContaining({
          word,
          solved: true
        })
      )
    );
  };

  beforeEach(() => {
    renderWithAppProviders(
      <Flashcard
        words={mockWords}
        onRoundComplete={mockHandleRoundComplete}
        onNext={mockHandleNext}
        onExit={mockHandleExit}
      />
    );
  });

  afterEach(() => {
    mockHandleNext.mockClear();
    mockHandleExit.mockClear();
    mockHandleRoundComplete.mockClear();
  });

  it('Should display first card with next button and previous disabled', async () => {
    await startGame();
    await screen.findByText(mockWords[0].body);
    await screen.findByRole('button', { name: /next/i });
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('Should display second card after next button click', async () => {
    await startGame();
    await screen.findByText(mockWords[0].body);
    await screen.findByRole('button', { name: /next/i });
    userEvent.click(screen.getByRole('button', { name: /next/i }));
    await checkRoundComplete(mockWords[0].body);
    await screen.findByText(mockWords[1].body);
  });

  it('Should display finish screen with words list', async () => {
    await startGame();
    await screen.findByText(mockWords[0].body);
    userEvent.click(screen.getByRole('button', { name: /next/i }));
    await checkRoundComplete(mockWords[0].body);

    await screen.findByText(mockWords[1].body);
    userEvent.click(screen.getByRole('button', { name: /next/i }));
    await checkRoundComplete(mockWords[1].body);

    await screen.findByText(mockWords[0].body);
    await screen.findByText(mockWords[1].body);
    await screen.findByRole('button', { name: /finish/i });
  });
});
