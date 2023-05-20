import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';
import { t } from 'i18n';
import { IPlayTaskProps, tPlayTaskComponentType } from '..';
import {
  IMinimalPairsTaskSession,
  IMinimalPairsTask,
  tMinimalPairsAnswer
} from 'students/models/lessonTasks';
import bgImage from './assets/minimalPairsBg.svg';
import { customMediaQuery } from 'students/views/shared/styled';
import { useSubmitOnComplete } from '../../common/hooks';
import PlayMinimalPairsMainScreen from './PlayMinimalPairsMainScreen';
import { ISelectAnswerPayload } from './MinimalPairsItem';
import PlayTaskScreenSwitcher from '../../common/components/screens/PlayTaskScreenSwitcher';

const PlayMinimalPairsTask: tPlayTaskComponentType<
  IPlayTaskProps<IMinimalPairsTask, IMinimalPairsTaskSession>
> = ({ task, taskSession, isCompleting, onNext, onFinish, className }) => {
  const { items, instruction } = task;
  const [answers, setAnswers] = useState<tMinimalPairsAnswer>([]);

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
    const { itemId, attemptsCount } = payload;
    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.taskItemId === itemId
    );
    if (existingAnswerIndex < 0) return;

    setAnswers((prevAnswers) => {
      const newAnswers = cloneDeep(prevAnswers);
      newAnswers[existingAnswerIndex].attemptsCount = attemptsCount;
      return newAnswers;
    });
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
        t('frontend.lesson_task.tasks.play.minimal_pairs.start_screen.heading')
      }
      itemsExist={!!items.length}
    >
      {(goToFinishScreen) => (
        <PlayMinimalPairsMainScreen
          task={task}
          onSelectAnswer={handleSelectAnswer}
          onComplete={handleCompleteTask(goToFinishScreen)}
        />
      )}
    </PlayTaskScreenSwitcher>
  );
};

export default PlayMinimalPairsTask;

PlayMinimalPairsTask.backgroundComponent = styled.div`
  background-color: #f6647d;
  background-image: linear-gradient(180deg, #f6647d 0%, #f59989 100%);
  height: 100vh;
  overflow: auto;
  ${customMediaQuery('tablet')} {
    background-image: url(${bgImage}), linear-gradient(180deg, #f6647d 0%, #f59989 100%);
    background-repeat: no-repeat, no-repeat;
    background-position: center;
    background-size: cover, auto;
  }
`;
