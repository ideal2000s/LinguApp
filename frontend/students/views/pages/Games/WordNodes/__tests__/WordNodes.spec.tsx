import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WordNodesContainer from '../WordNodesContainer';
import { mockWords } from './__mocks__/WordNodesMock';
import { renderWithAppProviders } from 'students/utils/testUtils';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));
jest.mock('../../common/CloseButton', (): React.FC => () => <button />);

jest.setTimeout(10000);

async function startGame() {
  await screen.findByRole('button', { name: /start/i });
  userEvent.click(screen.getByRole('button', { name: /start/i }));
}

describe('<WordNodes />', () => {
  const mockHandleNext = jest.fn();
  const mockHandleExit = jest.fn();

  beforeEach(() => {
    renderWithAppProviders(
      <WordNodesContainer
        phrases={mockWords}
        showTutorial={false}
        onNext={mockHandleNext}
        onExit={mockHandleExit}
      />
    );
  });

  afterEach(() => {
    mockHandleNext.mockClear();
    mockHandleExit.mockClear();
  });

  it('Should start word nodes game and contain question', async () => {
    await startGame();
    await screen.findAllByText(mockWords[0].wordTranslation);
  });
});
