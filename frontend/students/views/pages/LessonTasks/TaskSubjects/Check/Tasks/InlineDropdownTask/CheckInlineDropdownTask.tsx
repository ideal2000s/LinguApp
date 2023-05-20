import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import {
  IInlineDropdownItem,
  IInlineDropdownTask,
  IInlineDropdownTaskSession,
  tInlineDropdownAnswer
} from 'students/models';

import { ICheckTaskProps } from '..';
import { BaseCheckTaskBody, CheckNavFooter, SCheckTaskWrapper } from '../../components';
import InlineDropdownItem, { ISelectAnswerPayload } from './InlineDropdownItem';

const CheckInlineDropdownTask: FC<
  ICheckTaskProps<IInlineDropdownTask, IInlineDropdownTaskSession>
> = ({ task, taskSession, isCompleting, className, onNext, onSkip }) => {
  const [answers, setAnswers] = useState<tInlineDropdownAnswer>([]);

  useEffect(() => {
    if (taskSession?.taskItemSessions) {
      setAnswers(taskSession.taskItemSessions);
    } else {
      setAnswers(
        task.items.map((item: IInlineDropdownItem, index) => ({
          completed: false,
          id: index,
          taskItemId: item.id,
          answers: new Array(item.answers.length).fill(''),
          attemptsCount: 0
        }))
      );
    }
  }, [task, taskSession]);

  const handleSelectAnswer = (payload: ISelectAnswerPayload) => {
    const { value, wordIndex, itemId } = payload;

    const answerIndex = answers.findIndex((answer) => answer.taskItemId === itemId);
    if (answerIndex < 0) return;

    const answer = answers[answerIndex];
    const newItemAnswers = [...answer.answers];
    newItemAnswers.splice(wordIndex, 1, value);

    setAnswers([
      ...answers.slice(0, answerIndex),
      {
        ...answer,
        completed: true,
        answers: newItemAnswers
      },
      ...answers.slice(answerIndex + 1)
    ]);
  };

  const handleNext = () => {
    console.log(answers);
    onNext(answers);
  };

  const handleSkip = () => {
    onSkip();
  };

  if (!answers.length) return null;

  function getValuesForItem(item: IInlineDropdownItem) {
    return answers.find((answer) => answer.taskItemId === item.id)?.answers;
  }

  return (
    <>
      <SCheckTaskWrapper>
        <SBaseCheckTaskBody className={cn(className)} task={task}>
          {task?.items?.map((item: IInlineDropdownItem) => (
            <InlineDropdownItem
              key={item.id}
              item={item}
              value={getValuesForItem(item)}
              onSelectAnswer={handleSelectAnswer}
            />
          ))}
        </SBaseCheckTaskBody>
      </SCheckTaskWrapper>

      <CheckNavFooter
        isCompleting={isCompleting}
        onNext={handleNext}
        onSkip={handleSkip}
      />
    </>
  );
};

const SBaseCheckTaskBody = styled(BaseCheckTaskBody)`
  overflow: unset;
`;

export default CheckInlineDropdownTask;
