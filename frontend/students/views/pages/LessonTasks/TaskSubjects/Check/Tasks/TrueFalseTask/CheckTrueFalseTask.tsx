import React, { useEffect, useState } from 'react';
import { ICheckTaskProps } from '..';
import { BaseCheckTaskBody, CheckNavFooter, SCheckTaskWrapper } from '../../components';
import StatementItem, { ISelectAnswerPayload } from './StatementItem';
import {
  ICheckTrueFalseTask,
  ITrueFalseTaskSession,
  tTrueFalseAnswer
} from 'students/models';

const CheckTrueFalseTask: React.FC<
  ICheckTaskProps<ICheckTrueFalseTask, ITrueFalseTaskSession>
> = ({ task, taskSession, isCompleting, onNext, onSkip }) => {
  const { items } = task;

  const [answers, setAnswers] = useState<tTrueFalseAnswer>([]);

  useEffect(() => {
    if (taskSession?.taskItemSessions.length) {
      setAnswers(taskSession.taskItemSessions);
    } else {
      setAnswers(
        items.map((item, index) => {
          return {
            completed: false,
            id: index,
            taskItemId: item.id,
            answer: null,
            attemptsCount: 0
          };
        })
      );
    }
  }, [taskSession, items]);

  const handleSelectAnswer = (payload: ISelectAnswerPayload) => {
    const { value, itemId } = payload;

    const answerIndex = answers.findIndex((answer) => answer.taskItemId === itemId);
    if (answerIndex < 0) return;

    const answer = answers[answerIndex];

    setAnswers([
      ...answers.slice(0, answerIndex),
      {
        ...answer,
        answer: value
      },
      ...answers.slice(answerIndex + 1)
    ]);
  };

  const getItemAnswer = (id: number): boolean | null => {
    const answer = answers.filter((answer) => answer.taskItemId === id)[0];

    return answer ? answer.answer : null;
  };

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
          {items.map((item) => (
            <StatementItem
              key={item.id}
              options={{
                itemId: item.id,
                statement: item.statement,
                status: getItemAnswer(item.id)
              }}
              onSelectAnswer={handleSelectAnswer}
            />
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

export default CheckTrueFalseTask;
