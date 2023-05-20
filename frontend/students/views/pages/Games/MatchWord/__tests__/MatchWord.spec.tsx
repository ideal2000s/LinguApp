import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MatchWord, { IMatchWordRound } from '../MatchWord';
import { mockWords } from './__mocks__/MatchWordMock';
import { renderWithAppProviders } from 'students/utils/testUtils';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));
jest.mock('../../common/CloseButton', (): React.FC => () => <button />);

jest.setTimeout(10000);

async function startGame() {
  await screen.findByRole('button', { name: /start/i });
  userEvent.click(screen.getByRole('button', { name: /start/i }));

  await waitForElementToBeRemoved(screen.queryByRole('button', { name: /start/i }), {
    timeout: 2000
  });
}

const mockRound: IMatchWordRound = {
  phrases: mockWords
};

describe('<MatchWord />', () => {
  const mockHandleNext = jest.fn();
  const mockHandleExit = jest.fn();

  beforeEach(() => {
    renderWithAppProviders(
      <MatchWord rounds={[mockRound]} onFinish={mockHandleNext} onExit={mockHandleExit} />
    );
  });

  afterEach(() => {
    mockHandleNext.mockClear();
    mockHandleExit.mockClear();
  });

  it('Should start match word game and contain all words', async () => {
    await startGame();
    await screen.findByText(mockWords[0].body);
    await screen.findByText(mockWords[1].body);
  });
});
