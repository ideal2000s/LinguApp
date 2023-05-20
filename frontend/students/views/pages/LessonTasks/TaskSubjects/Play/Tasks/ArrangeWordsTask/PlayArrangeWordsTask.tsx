import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { t } from 'i18n';
import {
  IArrangeWordsTaskSession,
  IPlayArrangeWordsTask,
  tArrangeWordsAnswer
} from 'students/models/lessonTasks';
import { IPlayTaskProps, tPlayTaskComponentType } from '..';
import PlayArrangeWordsMainScreen from './PlayArrangeWordsMainScreen';
import { ISelectAnswerPayload } from './components/ArrangeWordsItem';
import { useSubmitOnComplete } from '../../common/hooks';
import PlayTaskScreenSwitcher from '../../common/components/screens/PlayTaskScreenSwitcher';
import leftBg from './assets/arrangeWordsBgLeft.svg';
import rightBg from './assets/arrangeWordsBgRight.svg';

const PlayArrangeWordsTask: tPlayTaskComponentType<
  IPlayTaskProps<IPlayArrangeWordsTask, IArrangeWordsTaskSession>
> = ({ task, taskSession, isCompleting, onFinish, onNext, className }) => {
  const { items, instruction } = task;
  const [answers, setAnswers] = useState<tArrangeWordsAnswer>([]);

  useEffect(() => {
    if (taskSession?.taskItemSessions) {
      setAnswers(taskSession.taskItemSessions);
    } else {
      setAnswers(
        items.map((item, index) => {
          return {
            id: index,
            completed: false,
            words: [],
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
        words: item.solution.trim().split(' '),
        attemptsCount
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
        t('frontend.lesson_task.tasks.play.arrange_words.start_screen.heading')
      }
      itemsExist={!!items.length}
    >
      {(goToFinishScreen) => (
        <PlayArrangeWordsMainScreen
          task={task}
          onSelectAnswer={handleSelectAnswer}
          onComplete={handleCompleteTask(goToFinishScreen)}
        />
      )}
    </PlayTaskScreenSwitcher>
  );
};

export default PlayArrangeWordsTask;

PlayArrangeWordsTask.backgroundComponent = styled.div`
  background-color: #4f398e;
  @media (min-width: ${({ theme }) => theme.linguBptLg}) {
    background-image: url(${leftBg}), url(${rightBg});
    background-repeat: no-repeat, no-repeat;
    background-position-x: left, right;
    background-size: contain;
  }
`;
