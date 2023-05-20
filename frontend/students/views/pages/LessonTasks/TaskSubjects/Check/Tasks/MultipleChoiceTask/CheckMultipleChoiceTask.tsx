import React, { useEffect, useState } from 'react';
import { IMultipleChoiceTaskSession, tMultipleChoiceAnswer } from 'students/models';
import { IMultipleChoiceItem, IMultipleChoiceTask } from 'students/models';
import MultipleChoiceOptions, { ISelectAnswerPayload } from './MultipleChoiceOptions';
import { ICheckTaskProps } from '..';
import {
  BaseCheckTaskBody,
  CheckNavFooter,
  SItemTitle,
  SCheckTaskWrapper,
  SItemWrapper
} from '../../components';

const CheckMultipleChoiceTask: React.FC<
  ICheckTaskProps<IMultipleChoiceTask, IMultipleChoiceTaskSession>
> = ({ task, taskSession, isCompleting, onNext, onSkip }) => {
  const { items } = task;

  const [answers, setAnswers] = useState<tMultipleChoiceAnswer>([]);

  useEffect(() => {
    if (taskSession?.taskItemSessions) {
      setAnswers(taskSession.taskItemSessions);
    } else {
      setAnswers(
        items.map((item, index) => {
          return {
            completed: false,
            id: index,
            taskItemId: item.id,
            options: item.options.map((option) => ({
              taskItemOptionId: option.id,
              answer: null
            })),
            attemptsCount: 0
          };
        })
      );
    }
  }, [items, taskSession]);

  function handleAnswerChange(payload: ISelectAnswerPayload) {
    const { itemId, optionId, isRadio } = payload;

    const answerIndex = answers.findIndex((a) => a.taskItemId === itemId);
    if (answerIndex < 0) return;

    const optionIndex = answers[answerIndex].options.findIndex(
      (o) => o.taskItemOptionId === optionId
    );
    if (optionIndex < 0) return;

    const answer = answers[answerIndex];

    if (isRadio) {
      setAnswers([
        ...answers.slice(0, answerIndex),
        {
          ...answer,
          options: [
            ...answer.options
              .slice(0, optionIndex)
              .map((option) => ({ ...option, answer: false })),
            {
              ...answer.options[optionIndex],
              answer: true
            },
            ...answer.options
              .slice(optionIndex + 1)
              .map((option) => ({ ...option, answer: false }))
          ]
        },
        ...answers.slice(answerIndex + 1)
      ]);
    } else {
      setAnswers([
        ...answers.slice(0, answerIndex),
        {
          ...answer,
          options: [
            ...answer.options.slice(0, optionIndex),
            {
              ...answer.options[optionIndex],
              answer: !answer.options[optionIndex].answer
            },
            ...answer.options.slice(optionIndex + 1)
          ]
        },
        ...answers.slice(answerIndex + 1)
      ]);
    }
  }

  const handleNext = () => {
    onNext(answers);
  };

  const handleSkip = () => {
    onSkip();
  };

  if (!answers.length) return null;

  return (
    <>
      <SCheckTaskWrapper>
        <BaseCheckTaskBody task={task}>
          {items.map((item: IMultipleChoiceItem, index: number) => (
            <SItemWrapper key={item.id}>
              <SItemTitle>{item.question}</SItemTitle>
              {item?.options?.length ? (
                <MultipleChoiceOptions
                  itemId={item.id}
                  options={item?.options}
                  answers={answers[index]}
                  singleChoice={item.singleChoice}
                  onAnswerChange={handleAnswerChange}
                />
              ) : null}
            </SItemWrapper>
          ))}
        </BaseCheckTaskBody>
      </SCheckTaskWrapper>

      <CheckNavFooter
        isCompleting={isCompleting}
        onNext={handleNext}
        onSkip={handleSkip}
      />
    </>
  );
};

export default CheckMultipleChoiceTask;
