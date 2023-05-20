import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WordWaterfallContainer from '../WordWaterfallContainer';
import { mockWords } from './__mocks__/WordWaterfallMock';
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

describe('<WordWaterfall />', () => {
  const mockHandleNext = jest.fn();
  const mockHandleExit = jest.fn();

  beforeEach(() => {
    renderWithAppProviders(
      <WordWaterfallContainer
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

  it('Should start word waterfall game and contain words', async () => {
    await startGame();
    await screen.findByText(mockWords[0].body);
    await screen.findByText(mockWords[1].body);
  });
});
