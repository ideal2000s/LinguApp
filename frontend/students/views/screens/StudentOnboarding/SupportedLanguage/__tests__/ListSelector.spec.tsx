import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import { ILanguage } from 'students/stores/user/preferences';

import { mockLanguages } from './__mocks__/ListSelectorMock';
import ListSelector from '../ListSelector';

const mockOnSelectedChange = jest.fn((lang: ILanguage) => lang);

describe('<ListSelector />', () => {
  const scrollIntoViewOriginal = window.HTMLElement.prototype.scrollIntoView;
  const scrollIntoViewMock = jest.fn();
  window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

  beforeEach(() => {
    render(
      <ListSelector
        items={mockLanguages}
        selected={mockLanguages[0]}
        onSelectedChange={mockOnSelectedChange}
      />
    );
  });

  afterAll(() => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewOriginal;
  });

  it('Component should contain all passed languages', () => {
    mockLanguages.forEach((language: ILanguage) =>
      expect(screen.getByText(language.systemName)).toBeInTheDocument()
    );
  });

  it('Component should fire change event after click on the new language', () => {
    const uncheckedLangButton = screen.getByLabelText(mockLanguages[1].systemName);
    userEvent.click(uncheckedLangButton);
    expect(mockOnSelectedChange).toHaveBeenCalledTimes(1);
    expect(mockOnSelectedChange).toHaveBeenCalledWith(mockLanguages[1]);
  });

  it('Component should fire scroll event on keydown', () => {
    fireEvent.keyDown(document, { key: 'e', code: 'KeyE' });
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
  });
});
