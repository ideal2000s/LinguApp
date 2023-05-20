import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CharacterButton from '../components/CharacterButton';

describe('<CharacterButton />', () => {
  const mockCharacter = 'A';
  const mockOnClickHandler = jest.fn();

  beforeEach(() => {
    render(<CharacterButton character={mockCharacter} onClick={mockOnClickHandler} />);
  });

  afterEach(() => {
    mockOnClickHandler.mockClear();
  });

  it('Component should contain character', () => {
    expect(screen.getByText(mockCharacter)).toBeInTheDocument();
  });

  it('Component should fire onClick event', () => {
    const characterBtn = screen.getByText(mockCharacter);
    userEvent.click(characterBtn);

    expect(mockOnClickHandler).toHaveBeenCalledTimes(1);
    expect(mockOnClickHandler).toHaveBeenCalledWith(mockCharacter);
  });
});
