import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { t } from 'i18n';
import { IPlayTaskProps, tPlayTaskComponentType } from '../index';
import {
  IImageObjectTaskSession,
  IPlayImageObjectTask,
  tImageObjectAnswer
} from 'students/models/lessonTasks';
import bgImage from './assets/ImageObjectTaskBg.png';
import bgImageWebp from './assets/ImageObjectTaskBg.webp';
import PlayImageObjectMainScreen from './PlayImageObjectMainScreen';
import { ISelectAnswerPayload } from './ImageObjectItem';
import { useSubmitOnComplete } from '../../common/hooks';
import PlayTaskScreenSwitcher from '../../common/components/screens/PlayTaskScreenSwitcher';
import { customMediaQuery } from 'students/views/shared/styled';

const PlayImageObjectTask: tPlayTaskComponentType<
  IPlayTaskProps<IPlayImageObjectTask, IImageObjectTaskSession>
> = ({ task, taskSession, isCompleting, onFinish, onNext, className }) => {
  const { items, instruction } = task;
  const [answers, setAnswers] = useState<tImageObjectAnswer>([]);

  useEffect(() => {
    if (taskSession?.taskItemSessions) {
      setAnswers(taskSession.taskItemSessions);
    } else {
      setAnswers(
        items.map((item, index) => {
          return {
            id: index,
            taskItemId: item.id,
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
    const { itemId, attemptsCount } = payload;

    const answerIndex = answers.findIndex((answer) => answer.taskItemId === itemId);
    if (answerIndex < 0) return;

    const answer = answers[answerIndex];

    setAnswers([
      ...answers.slice(0, answerIndex),
      {
        ...answer,
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
        t('frontend.lesson_task.tasks.play.image_object.start_screen.heading')
      }
      itemsExist={!!items.length}
    >
      {(goToFinishScreen) => (
        <PlayImageObjectMainScreen
          task={task}
          onSelectAnswer={handleSelectAnswer}
          onComplete={handleCompleteTask(goToFinishScreen)}
        />
      )}
    </PlayTaskScreenSwitcher>
  );
};

export default PlayImageObjectTask;

PlayImageObjectTask.backgroundComponent = styled.div`
  background-color: #353b67;
  background-image: linear-gradient(180deg, #353b67 0%, #212543 100%);

  ${customMediaQuery('desktop')} {
    background-repeat: no-repeat, no-repeat;
    background-position: center;
    background-size: cover, auto;

    .no-webp & {
      background-image: url(${bgImage}), linear-gradient(180deg, #353b67 0%, #212543 100%);
    }
    .webp & {
      background-image: url(${bgImageWebp}),
        linear-gradient(180deg, #353b67 0%, #212543 100%);
    }
  }
`;
