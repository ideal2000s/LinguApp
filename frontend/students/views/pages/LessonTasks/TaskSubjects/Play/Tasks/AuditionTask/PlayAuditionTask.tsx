import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { t } from 'i18n';
import { IPlayTaskProps, tPlayTaskComponentType } from '../index';
import {
  IAuditionTaskSession,
  IPlayAuditionTask,
  tAuditionAnswer
} from 'students/models/lessonTasks';
import bgImage from './assets/AuditionTaskBg.png';
import bgImageWebp from './assets/AuditionTaskBg.webp';
import { useSubmitOnComplete } from '../../common/hooks';
import { customMediaQuery } from 'students/views/shared/styled';
import PlayAuditionMainScreen from './PlayAuditionMainScreen';
import { ISelectAnswerPayload } from './components/AuditionItem';
import PlayTaskScreenSwitcher from '../../common/components/screens/PlayTaskScreenSwitcher';

const PlayAuditionTask: tPlayTaskComponentType<
  IPlayTaskProps<IPlayAuditionTask, IAuditionTaskSession>
> = ({ task, taskSession, isCompleting, onFinish, onNext, className }) => {
  const { items } = task;
  const [answers, setAnswers] = useState<tAuditionAnswer>([]);

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
        task.instruction ||
        t('frontend.lesson_task.tasks.play.audition.start_screen.heading')
      }
      itemsExist={!!items.length}
    >
      {(goToFinishScreen) => (
        <PlayAuditionMainScreen
          task={task}
          onSelectAnswer={handleSelectAnswer}
          onComplete={handleCompleteTask(goToFinishScreen)}
        />
      )}
    </PlayTaskScreenSwitcher>
  );
};

export default PlayAuditionTask;

PlayAuditionTask.backgroundComponent = styled.div`
  background: linear-gradient(180deg, #9f599d 0%, #491564 100%, #6d3989 100%);
  ${customMediaQuery('tablet')} {
    background-repeat: no-repeat, no-repeat;
    background-position: center;
    background-size: cover, auto;
    .no-webp & {
      background-image: url(${bgImage}),
        linear-gradient(180deg, #9f599d 0%, #491564 100%, #6d3989 100%),
        linear-gradient(180deg, #26989b 0%, #82cdaf 100%),
        linear-gradient(180deg, #c7367d 0%, #e467a2 100%);
    }
    .webp & {
      background-image: url(${bgImageWebp}),
        linear-gradient(180deg, #9f599d 0%, #491564 100%, #6d3989 100%),
        linear-gradient(180deg, #26989b 0%, #82cdaf 100%),
        linear-gradient(180deg, #c7367d 0%, #e467a2 100%);
    }
  }
`;
