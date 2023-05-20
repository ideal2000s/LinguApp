import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultipleChoiceOptions from '../MultipleChoiceOptions';
import { mockSingleChoice, mockMultiChoice } from './__mocks__/MultipleChoiceOptionsMock';

describe('<MultipleChoiceOptions />', () => {
  const onAnswerChange = jest.fn();

  describe('Single Choice', () => {
    beforeEach(() => {
      render(
        <MultipleChoiceOptions
          itemId={mockSingleChoice.itemId}
          singleChoice={mockSingleChoice.singleChoice}
          options={mockSingleChoice.options}
          answers={mockSingleChoice.answers}
          onAnswerChange={onAnswerChange}
        />
      );
    });

    afterEach(() => {
      onAnswerChange.mockClear();
    });

    it('Component should fire change event when answer is specified', () => {
      mockSingleChoice.options.forEach((option, index) => {
        const radio = screen.getByLabelText(option.answer.trim());
        userEvent.click(radio);

        expect(onAnswerChange).toHaveBeenCalledTimes(index + 1);
        expect(onAnswerChange).toHaveBeenLastCalledWith({
          isRadio: mockSingleChoice.singleChoice,
          itemId: mockSingleChoice.itemId,
          optionId: option.id
        });
      });
    });
  });

  describe('Multi Choice', () => {
    const onAnswerChange = jest.fn();

    beforeEach(() => {
      render(
        <MultipleChoiceOptions
          itemId={mockMultiChoice.itemId}
          singleChoice={mockMultiChoice.singleChoice}
          options={mockMultiChoice.options}
          answers={mockMultiChoice.answers}
          onAnswerChange={onAnswerChange}
        />
      );
    });

    afterEach(() => {
      onAnswerChange.mockClear();
    });

    it('Component should fire change event when answer is specified', () => {
      mockMultiChoice.options.forEach((option, index) => {
        const checkbox = screen.getByLabelText(option.answer.trim());
        userEvent.click(checkbox);

        expect(onAnswerChange).toHaveBeenCalledTimes(index + 1);
        expect(onAnswerChange).toHaveBeenLastCalledWith({
          isRadio: mockMultiChoice.singleChoice,
          itemId: mockMultiChoice.itemId,
          optionId: option.id
        });
      });
    });
  });
});
