import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';
import { t } from 'i18n';
import { IPlayTaskProps, tPlayTaskComponentType } from '../index';
import {
  IImageHotspotTaskSession,
  IPlayImageHotspotTask,
  tImageHotspotAnswer
} from 'students/models/lessonTasks';
import bgImage from './assets/ImageHotspotTaskBg.svg';
import PlayImageHotspotMainScreen from './PlayImageHotspotMainScreen';
import { ISelectAnswerPayload } from './ImageHotspotItem';
import { useSubmitOnComplete } from '../../common/hooks';
import PlayTaskScreenSwitcher from '../../common/components/screens/PlayTaskScreenSwitcher';

const PlayImageHotspotTask: tPlayTaskComponentType<
  IPlayTaskProps<IPlayImageHotspotTask, IImageHotspotTaskSession>
> = ({ task, taskSession, isCompleting, onFinish, onNext, className }) => {
  const { items } = task;
  const [answers, setAnswers] = useState<tImageHotspotAnswer>([]);

  useEffect(() => {
    if (taskSession?.taskItemSessions) {
      setAnswers(taskSession.taskItemSessions);
    } else {
      setAnswers(
        items.map((item, index) => ({
          id: index,
          taskItemId: item.id,
          completed: false,
          attemptsCount: 0
        }))
      );
    }
  }, [taskSession, items]);

  const submitTask = useCallback(() => {
    onFinish && onFinish(answers);
  }, [onFinish, answers]);

  const markCompleted = useSubmitOnComplete(submitTask);

  const handleSelectAnswer = useCallback(
    (payload: ISelectAnswerPayload) => {
      const { itemId, attemptsCount } = payload;
      const answerIndex = answers.findIndex((answer) => answer.taskItemId === itemId);
      if (answerIndex < 0) return;

      setAnswers((prevAnswers) => {
        const newAnswers = cloneDeep(prevAnswers);
        newAnswers[answerIndex].attemptsCount = attemptsCount;
        return newAnswers;
      });
    },
    [answers]
  );

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
      startScreenHeading={t(
        'frontend.lesson_task.tasks.play.image_hotspot.start_screen.heading'
      )}
      itemsExist={!!items.length}
    >
      {(goToFinishScreen) => (
        <PlayImageHotspotMainScreen
          task={task}
          onSelectAnswer={handleSelectAnswer}
          onComplete={handleCompleteTask(goToFinishScreen)}
        />
      )}
    </PlayTaskScreenSwitcher>
  );
};

export default PlayImageHotspotTask;

PlayImageHotspotTask.backgroundComponent = styled.div`
  background-color: #8b69c5;
  @media (min-width: ${({ theme }) => theme.linguBptLg}) {
    background-image: url(${bgImage});
    background-repeat: no-repeat, no-repeat;
    background-position: center;
    background-size: cover, auto;
  }
`;
