import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageHotspotItem from '../ImageHotspotItem';
import { mockItem } from './__mocks__/ImageHotspotItemMock';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

jest.setTimeout(10000);

describe('<ImageHotspotItem />', () => {
  const mockHandleSelectAnswer = jest.fn();
  const mockHandleItemSelect = jest.fn();

  beforeEach(() => {
    render(
      <ImageHotspotItem
        isCompleted={false}
        currentIndex={0}
        items={[mockItem]}
        onSelectAnswer={mockHandleSelectAnswer}
        onItemSelect={mockHandleItemSelect}
      />
    );
  });

  afterEach(() => {
    mockHandleSelectAnswer.mockClear();
    mockHandleItemSelect.mockClear();
  });

  it('Component should contains correct word', async () => {
    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: mockItem.word.body })
        ).toBeInTheDocument(),
      { timeout: 3000 }
    );
  });

  it('Component should fire select event when correct option clicked', async () => {
    await waitFor(
      () => {
        expect(
          screen.getByRole('button', { name: mockItem.word.body })
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const wordButton = screen.getByRole('button', { name: mockItem.word.body });
    userEvent.click(wordButton);

    await waitFor(() => expect(mockHandleSelectAnswer).toHaveBeenCalledTimes(1), {
      timeout: 3000
    });
  });
});
