import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayWordGames from '../PlayWordGamesTask';
import { mockTask, lessonPhrasesMock } from './__mocks__/PlayWordGamesTaskMock';
import { renderWithAppProviders } from 'students/utils/testUtils';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockImplementation(() => ({
    lessonId: 1
  })),
  Link: ({ props, children }: { props: any; children: any }) => (
    <a {...props}>{children}</a>
  )
}));

jest.setTimeout(10000);

describe('<PlayWordGames />', () => {
  const mockHandleFinish = jest.fn();

  beforeEach(() => {
    renderWithAppProviders(
      <PlayWordGames
        lessonPhrases={lessonPhrasesMock}
        isCompleting={false}
        task={mockTask}
        onFinish={mockHandleFinish}
      />
    );
  });

  afterEach(() => {
    mockHandleFinish.mockClear();
  });

  it('Should show word from phrases to learn in Flashcards game', async () => {
    await screen.findByRole('button', { name: /start/i });
    userEvent.click(screen.getByRole('button', { name: /start/i }));
    await screen.findByText(lessonPhrasesMock[0].body);
  });
});
