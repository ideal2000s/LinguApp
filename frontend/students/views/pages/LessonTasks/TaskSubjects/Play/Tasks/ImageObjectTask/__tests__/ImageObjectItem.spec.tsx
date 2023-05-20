import React from 'react';
import { screen } from '@testing-library/react';
import ImageObjectItem from '../ImageObjectItem';
import {
  mockHeading,
  mockImageSize,
  mockImageURL,
  mockItemWithAudio,
  mockItemWithoutAudio
} from './__mocks__/ImageObjectItemMock';
import { renderWithAppProviders } from 'students/utils/testUtils';

jest.mock('students/utils', () => ({
  playSound: jest.fn()
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

describe('<ImageObjectItem />', () => {
  describe('Common check', () => {
    const mockHandleSelectAnswer = jest.fn();

    beforeEach(() => {
      renderWithAppProviders(
        <ImageObjectItem
          item={mockItemWithAudio}
          imageURL={mockImageURL}
          onSelectAnswer={mockHandleSelectAnswer}
          points={[]}
          imageSize={mockImageSize}
        />
      );
    });

    afterEach(() => {
      mockHandleSelectAnswer.mockClear();
    });

    it('Component should contains image', () => {
      expect(screen.getByRole('image')).toBeInTheDocument();
    });
  });

  describe('Item with audio', () => {
    const mockHandleSelectAnswer = jest.fn();

    beforeEach(() => {
      renderWithAppProviders(
        <ImageObjectItem
          item={mockItemWithAudio}
          imageURL={mockImageURL}
          onSelectAnswer={mockHandleSelectAnswer}
          points={[]}
          imageSize={mockImageSize}
        />
      );
    });

    afterEach(() => {
      mockHandleSelectAnswer.mockClear();
    });

    it('Component should contains audio player when audio file exists', () => {
      expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    });
  });

  describe('Item without audio', () => {
    const mockHandleSelectAnswer = jest.fn();

    beforeEach(() => {
      renderWithAppProviders(
        <ImageObjectItem
          item={mockItemWithoutAudio}
          imageURL={mockImageURL}
          onSelectAnswer={mockHandleSelectAnswer}
          points={[]}
          imageSize={mockImageSize}
        />
      );
    });

    afterEach(() => {
      mockHandleSelectAnswer.mockClear();
    });

    it('Component should contains heading when audio file does not exist', () => {
      expect(screen.getByText(mockHeading)).toBeInTheDocument();
    });
  });
});
