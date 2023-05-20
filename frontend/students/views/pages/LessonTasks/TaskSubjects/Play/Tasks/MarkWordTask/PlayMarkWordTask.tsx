import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { t } from 'i18n';
import { IMarkWordTask, IMarkWordTaskSession, tMarkWordAnswer } from 'students/models';
import bgImage from './assets/markWordBg.svg';
import { IPlayTaskProps, tPlayTaskComponentType } from '..';
import PlayMarkWordMainScreen from './PlayMarkWordMainScreen';
import { ISelectAnswerPayload } from './MarkWordItem';
import { useSubmitOnComplete } from '../../common/hooks';
import PlayTaskScreenSwitcher from '../../common/components/screens/PlayTaskScreenSwitcher';

const PlayMarkWordTask: tPlayTaskComponentType<
  IPlayTaskProps<IMarkWordTask, IMarkWordTaskSession>
> = ({ task, taskSession, isCompleting, onFinish, onNext, className }) => {
  const { items, instruction } = task;
  const [answers, setAnswers] = useState<tMarkWordAnswer>([]);

  useEffect(() => {
    if (taskSession?.taskItemSessions) {
      setAnswers(taskSession.taskItemSessions);
    } else {
      setAnswers(
        items.map((item, index) => {
          return {
            id: index,
            completed: false,
            answers: new Array(item.words.length).fill(''),
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
    const { itemId, attemptsCount, solution } = payload;

    const answerIndex = answers.findIndex((answer) => answer.taskItemId === itemId);

    if (answerIndex < 0) return;

    const answer = answers[answerIndex];

    setAnswers([
      ...answers.slice(0, answerIndex),
      {
        ...answer,
        attemptsCount,
        answers: [solution]
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
        instruction || t('frontend.lesson_task.tasks.play.mark_word.start_screen.heading')
      }
      itemsExist={!!items.length}
    >
      {(goToFinishScreen) => (
        <PlayMarkWordMainScreen
          task={task}
          onSelectAnswer={handleSelectAnswer}
          onComplete={handleCompleteTask(goToFinishScreen)}
        />
      )}
    </PlayTaskScreenSwitcher>
  );
};

export default PlayMarkWordTask;

PlayMarkWordTask.backgroundComponent = styled.div`
  background-color: #4c69cb;
  background-image: linear-gradient(180deg, #4c69cb 0%, #3d1f7d 100%);

  @media (min-width: ${({ theme }) => theme.linguBptLg}) {
    background-image: url(${bgImage}), linear-gradient(180deg, #4c69cb 0%, #3d1f7d 100%);
    background-repeat: no-repeat, no-repeat;
    background-position: center;
    background-size: cover, auto;
  }
`;
