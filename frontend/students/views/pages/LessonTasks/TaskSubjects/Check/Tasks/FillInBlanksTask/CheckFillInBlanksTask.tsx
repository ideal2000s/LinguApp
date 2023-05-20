import React, { useEffect, useState } from 'react';
import { ICheckTaskProps } from '..';
import { BaseCheckTaskBody, CheckNavFooter, SCheckTaskWrapper } from '../../components';
import {
  ICheckFillInBlanksTask,
  IFillInBlanksTaskSession,
  tFillInBlanksAnswer
} from 'students/models/lessonTasks';
import SentenceItem, { ISelectAnswerPayload } from './SentenceItem';

const CheckFillInBlanksTask: React.FC<
  ICheckTaskProps<ICheckFillInBlanksTask, IFillInBlanksTaskSession>
> = ({ task, taskSession, isCompleting, onNext, onSkip }) => {
  const { items } = task;

  const [answers, setAnswers] = useState<tFillInBlanksAnswer>([]);
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
            answers: new Array(item.solution.length).fill(''),
            attemptsCount: 0
          };
        })
      );
    }
  }, [taskSession, items]);

  const handleSelectAnswer = (payload: ISelectAnswerPayload) => {
    const { value, itemId, wordIndex } = payload;

    const itemIndex = answers.findIndex((a) => a.taskItemId === itemId);
    if (itemIndex < 0) return;

    const item = answers[itemIndex];
    const newItemAnswers = [...item.answers];
    newItemAnswers.splice(wordIndex, 1, value);
    setAnswers([
      ...answers.slice(0, itemIndex),
      {
        ...item,
        answers: newItemAnswers
      },
      ...answers.slice(itemIndex + 1)
    ]);
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
          {items.map((item, itemIndex) => (
            <SentenceItem
              key={item.id}
              options={{
                id: item.id,
                sentence: item.question
              }}
              value={answers[itemIndex]?.answers}
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

export default CheckFillInBlanksTask;
