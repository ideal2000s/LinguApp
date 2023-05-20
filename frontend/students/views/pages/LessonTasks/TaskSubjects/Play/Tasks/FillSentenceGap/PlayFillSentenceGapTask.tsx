import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { t } from 'i18n';
import {
  IFillSentenceGapTask,
  IFillSentenceGapTaskSession,
  tFillSentenceGapAnswer
} from 'students/models';
import bgImage from './assets/fillSentenceGapBg.svg';
import { IPlayTaskProps, tPlayTaskComponentType } from '..';
import { ISelectAnswerPayload } from './components/SentenceGapItem';
import { useSubmitOnComplete } from '../../common/hooks';
import PlayTaskScreenSwitcher from '../../common/components/screens/PlayTaskScreenSwitcher';
import ItemsScreen from './ItemsScreen';

const PlayFillSentenceGapTask: tPlayTaskComponentType<
  IPlayTaskProps<IFillSentenceGapTask, IFillSentenceGapTaskSession>
> = ({ task, taskSession, isCompleting, onFinish, onNext, className }) => {
  const { items, instruction } = task;
  const [answers, setAnswers] = useState<tFillSentenceGapAnswer>([]);

  useEffect(() => {
    if (taskSession?.taskItemSessions) {
      setAnswers(taskSession.taskItemSessions);
    } else {
      setAnswers(
        items.map((item, index) => {
          return {
            id: index,
            completed: false,
            answers: new Array(item.solution.length).fill(''),
            taskItemId: item.id,
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
    const { itemId, attemptsCount, itemIndex } = payload;

    const item = items[itemIndex];

    const answerIndex = answers.findIndex((answer) => answer.taskItemId === itemId);

    if (answerIndex < 0) return;

    const answer = answers[answerIndex];

    setAnswers([
      ...answers.slice(0, answerIndex),
      {
        ...answer,
        attemptsCount,
        answers: item.solution
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
        instruction || t('frontend.lesson_task.tasks.play.fill_gap.start_screen.heading')
      }
      itemsExist={!!items.length}
    >
      {(goToFinishScreen) => (
        <ItemsScreen
          task={task}
          onSelectAnswer={handleSelectAnswer}
          onComplete={handleCompleteTask(goToFinishScreen)}
        />
      )}
    </PlayTaskScreenSwitcher>
  );
};

export default PlayFillSentenceGapTask;

PlayFillSentenceGapTask.backgroundComponent = styled.div`
  background-color: #c7367d;
  background-image: linear-gradient(180deg, #c7367d 0%, #e467a2 100%);

  @media (min-width: ${({ theme }) => theme.linguBptLg}) {
    background-image: url(${bgImage}), linear-gradient(180deg, #c7367d 0%, #e467a2 100%);
    background-repeat: no-repeat, no-repeat;
    background-position: center;
    background-size: cover, auto;
  }
`;
