import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { t } from 'i18n';
import {
  IInlineDropdownTask,
  IInlineDropdownTaskSession,
  tInlineDropdownAnswer
} from 'students/models';
import PlayInlineDropdownMainScreen from './PlayInlineDropdownMainScreen';
import { ISelectAnswerPayload } from './InlineDropdownItem';
import bgImage from './assets/inlineDropdownBg.svg';
import { IPlayTaskProps, tPlayTaskComponentType } from '..';
import { useSubmitOnComplete } from '../../common/hooks';
import PlayTaskScreenSwitcher from '../../common/components/screens/PlayTaskScreenSwitcher';

const PlayInlineDropdownTask: tPlayTaskComponentType<
  IPlayTaskProps<IInlineDropdownTask, IInlineDropdownTaskSession>
> = ({ task, taskSession, isCompleting, onFinish, onNext, className }) => {
  const { items, instruction } = task;
  const [answers, setAnswers] = useState<tInlineDropdownAnswer>([]);

  useEffect(() => {
    if (taskSession?.taskItemSessions) {
      setAnswers(taskSession.taskItemSessions);
    } else {
      setAnswers(
        items.map((item, index) => {
          return {
            id: index,
            taskItemId: item.id,
            answers: new Array(item.solution.length).fill(''),
            completed: false,
            attemptsCount: 0
          };
        })
      );
    }
  }, [taskSession, items]);

  const submitTask = useCallback(() => {
    onFinish && onFinish(answers);
  }, [onFinish, answers]);

  const markCompleted = useSubmitOnComplete(submitTask);

  const handleSelectAnswer = (payload: ISelectAnswerPayload) => {
    const { value, wordIndex, itemId, attemptsCount } = payload;

    const answerIndex = answers.findIndex((a) => a.taskItemId === itemId);
    if (answerIndex < 0) return;

    const answer = answers[answerIndex];
    const newItemAnswers = [...answer.answers];
    newItemAnswers.splice(wordIndex, 1, value);
    setAnswers([
      ...answers.slice(0, answerIndex),
      {
        ...answer,
        attemptsCount,
        answers: newItemAnswers
      },
      ...answers.slice(answerIndex + 1)
    ]);
  };

  const handleCompleteTask = (goToFinishScreen: () => void) => () => {
    markCompleted();

    goToFinishScreen();
  };

  const handleFinishTask = () => {
    onNext && onNext();
  };

  return (
    <PlayTaskScreenSwitcher
      isCompleting={isCompleting}
      onExitFinishScreen={handleFinishTask}
      className={className}
      startScreenHeading={
        instruction ||
        t('frontend.lesson_task.tasks.play.inline_dropdown.start_screen.heading')
      }
      itemsExist={!!items.length}
    >
      {(goToFinishScreen) => (
        <PlayInlineDropdownMainScreen
          task={task}
          onSelectAnswer={handleSelectAnswer}
          onComplete={handleCompleteTask(goToFinishScreen)}
        />
      )}
    </PlayTaskScreenSwitcher>
  );
};

export default PlayInlineDropdownTask;

PlayInlineDropdownTask.backgroundComponent = styled.div`
  background-color: #1a8fb9;
  background-image: linear-gradient(180deg, #004374 0%, #1a8fb9 45.25%, #0898cb 69.98%);

  @media (min-width: ${({ theme }) => theme.linguBptLg}) {
    background-image: url(${bgImage}),
      linear-gradient(180deg, #004374 0%, #1a8fb9 45.25%, #0898cb 69.98%);
    background-repeat: no-repeat, no-repeat;
    background-position: center;
    background-size: cover, auto;
  }
`;
