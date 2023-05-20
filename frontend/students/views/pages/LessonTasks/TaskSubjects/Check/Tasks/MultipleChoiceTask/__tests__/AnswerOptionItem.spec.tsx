import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithAppProviders } from 'students/utils/testUtils';
import AnswerOptionItem from '../AnswerOptionItem';
import { mockMultipleChoiceItem } from './__mocks__/AnswerMultipleChoiceTask';

describe('<AnswerOptionItem/>', () => {
  beforeEach(() => {
    renderWithAppProviders(
      <AnswerOptionItem
        itemSession={mockMultipleChoiceItem.itemSession.options}
        option={mockMultipleChoiceItem.options[0]}
      />
    );
  });

  it('Component renders option item', () => {
    const optionItem = screen.getByText(mockMultipleChoiceItem.options[0].answer);
    expect(optionItem).toBeInTheDocument();
  });
});
