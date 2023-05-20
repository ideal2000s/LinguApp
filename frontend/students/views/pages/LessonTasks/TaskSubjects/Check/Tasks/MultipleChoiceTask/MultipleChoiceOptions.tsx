import React, { FC } from 'react';
import {
  IMultipleChoiceItemOption,
  IMultipleChoiceTaskItemSession
} from 'students/models/lessonTasks';

import CheckboxOptionItem from './CheckboxOptionItem';
import RadioOptionItem from './RadioOptionItem';

export interface ISelectAnswerPayload {
  itemId: number;
  optionId: number;
  isRadio: boolean;
}

interface IMultipleChoiceOptions {
  itemId: number;
  singleChoice: boolean | null;
  options: IMultipleChoiceItemOption[];
  onAnswerChange: ({ itemId, optionId, isRadio }: ISelectAnswerPayload) => void;
  answers: IMultipleChoiceTaskItemSession;
}

const MultipleChoiceOptions: FC<IMultipleChoiceOptions> = ({
  itemId,
  singleChoice,
  options,
  onAnswerChange,
  answers
}) => {
  const handleAnswerChange = (optionId: number, isRadio: boolean) => {
    onAnswerChange({ itemId, optionId, isRadio });
  };

  return singleChoice ? (
    <>
      {options?.map((option: IMultipleChoiceItemOption, index: number) => (
        <RadioOptionItem
          key={option.id}
          option={option}
          checked={Boolean(answers.options[index]?.answer)}
          onRadioChange={handleAnswerChange}
        />
      ))}
    </>
  ) : (
    <>
      {options?.map((option: IMultipleChoiceItemOption, index) => (
        <CheckboxOptionItem
          key={option.id}
          checked={Boolean(answers.options[index]?.answer)}
          option={option}
          onCheckboxChange={handleAnswerChange}
        />
      ))}
    </>
  );
};

export default MultipleChoiceOptions;
