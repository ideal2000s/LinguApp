import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { t } from 'i18n';
import {
  IDictationItem,
  IDictationTask,
  IDictationTaskItemSession,
  IDictationTaskSession,
  tDictationAnswer
} from 'students/models/lessonTasks';
import { customMediaQuery } from 'students/views/shared/styled';

import PlayDictationTaskMainScreen from './PlayDictationTaskMainScreen';
import { ISelectAnswerPayload } from './components/DictationTaskItem';
import bgImage from './assets/dictationTaskBg.svg';
import { IPlayTaskProps, tPlayTaskComponentType } from '..';
import { SPlayTaskWrapper } from '../../common/components';
import PlayTaskScreenSwitcher from '../../common/components/screens/PlayTaskScreenSwitcher';
import { useSubmitOnComplete } from '../../common/hooks';

const PlayDictationTask: tPlayTaskComponentType<
  IPlayTaskProps<IDictationTask, IDictationTaskSession>
> = ({ task, taskSession, isCompleting, onFinish, onNext, className }) => {
  const { items, instruction } = task;
  const [answers, setAnswers] = useState<tDictationAnswer>([]);

  useEffect(() => {
    if (taskSession?.taskItemSessions) {
      setAnswers(taskSession.taskItemSessions);
    } else {
      setAnswers(
        items.map((item: IDictationItem, index: number) => {
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
    const { itemId, attemptsCount } = payload;

    const answerIndex = answers.findIndex(
      (answer: IDictationTaskItemSession) => answer.taskItemId === itemId
    );
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
    <SCustomPlayTaskWrapper className={cn(className)}>
      <SPlayTaskScreenSwitcher
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
          <PlayDictationTaskMainScreen
            task={task}
            onSelectAnswer={handleSelectAnswer}
            onComplete={handleCompleteTask(goToFinishScreen)}
          />
        )}
      </SPlayTaskScreenSwitcher>
    </SCustomPlayTaskWrapper>
  );
};

export default PlayDictationTask;

PlayDictationTask.backgroundComponent = styled.div`
  background-color: #adadad;
  background-image: linear-gradient(180deg, #bc739b 0.04%, #934cbe 100%);

  ${customMediaQuery('tablet')} {
    background-image: url(${bgImage}),
      linear-gradient(180deg, #bc739b 0.04%, #934cbe 100%);
    background-repeat: no-repeat, no-repeat;
    background-position: center;
    background-size: cover, auto;
  }
`;

const SCustomPlayTaskWrapper = styled(SPlayTaskWrapper)`
  justify-content: center;
`;

const SPlayTaskScreenSwitcher = styled(PlayTaskScreenSwitcher)`
  width: 100%;
`;
