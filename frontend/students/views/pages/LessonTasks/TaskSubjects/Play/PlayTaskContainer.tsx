import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { playTaskMap } from './Tasks';
import { tSubjectComponentProps } from '..';
import { PlayPage } from './common/components';
import { LessonTaskHeader } from 'students/views/pages/LessonTasks/LessonTask';
import NotSupportedTask from '../../NotSupportedTask';
import { PLAY_PAGE_DEFAULT_COLOR } from './common/components/PlayPage';
import { tAnswer, tPlayTaskType } from 'students/models/lessonTasks';
import {
  shrinkingBubbleChanger,
  isFinishButtonDetected,
  onStartButtonPositioned,
  offStartButtonPositioned,
  clearAnimationData
} from 'students/views/shared/bundles/bubbleAnimationManager';
import TaskTransitioner from './TaskTransitioner';

export interface IPlaySubjectComponentProps extends tSubjectComponentProps {
  task: tPlayTaskType;
}

const PlayTaskContainer: React.FC<IPlaySubjectComponentProps> = ({
  task,
  taskSession,
  lessonPhrases,
  isLoading,
  isCompleting,
  onFinish,
  onNext,
  onExit,
  onFinishAndNext
}) => {
  const TaskComponent = playTaskMap.get(task.type);
  const isHeaderVisible = task.type !== 'Tasks::WordGames';
  const [startButtonPositioned, setStartButtonPositioned] = useState(false);
  const showBubbleAnimation = isFinishButtonDetected();
  const prevTaskIdRef = useRef(0);

  useEffect(() => {
    const handleStartButtonPositioned = () => {
      setStartButtonPositioned(true);
    };
    onStartButtonPositioned(handleStartButtonPositioned);
    return () => {
      offStartButtonPositioned(handleStartButtonPositioned);
      clearAnimationData();
    };
  }, []);

  const handleFinish = useCallback(
    (answers: tAnswer) => {
      if (!isCompleting) {
        onFinish(answers);
      }
    },
    [isCompleting, onFinish]
  );

  const handleNext = useCallback(() => {
    if (!isCompleting) {
      onNext();
      prevTaskIdRef.current = task.id;
      setStartButtonPositioned(false);
    }
  }, [isCompleting, onNext, task.id]);

  const handleSkip = useCallback(() => {
    if (!isCompleting) {
      onFinishAndNext();
      prevTaskIdRef.current = task.id;
      setStartButtonPositioned(false);
    }
  }, [isCompleting, onFinishAndNext, task.id]);

  const handleExit = useCallback(() => {
    onExit();
  }, [onExit]);

  const taskBody = useMemo(() => {
    let currentTaskBody: JSX.Element | null;
    if (isLoading) {
      currentTaskBody = null;
    } else {
      currentTaskBody = (
        <>
          {TaskComponent ? (
            <TaskComponent
              className="flex-grow-1"
              key={task.id}
              lessonPhrases={lessonPhrases}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              task={task}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              taskSession={taskSession}
              isCompleting={!!isCompleting}
              onFinish={handleFinish}
              onNext={handleNext}
              onExit={handleExit}
              onSkip={handleSkip}
            />
          ) : (
            <NotSupportedTask
              color={PLAY_PAGE_DEFAULT_COLOR}
              isCompleting={!!isCompleting}
              onNext={handleSkip}
            />
          )}
          {startButtonPositioned && shrinkingBubbleChanger()}
        </>
      );
    }

    return currentTaskBody;
  }, [
    TaskComponent,
    handleFinish,
    handleNext,
    handleSkip,
    handleExit,
    isCompleting,
    isLoading,
    task,
    taskSession,
    lessonPhrases,
    startButtonPositioned
  ]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <TaskTransitioner
            showBubbleAnimation={showBubbleAnimation}
            loadingOnly={task.type === 'Tasks::WordGames'}
          />
        )}
      </AnimatePresence>
      <PlayPage
        backgroundComponent={TaskComponent?.backgroundComponent}
        className={cn({
          invisible:
            showBubbleAnimation &&
            prevTaskIdRef.current !== task.id &&
            !startButtonPositioned
        })}
      >
        {isHeaderVisible && <LessonTaskHeader onClose={onExit} />}
        <SPlayTaskContainer>{taskBody}</SPlayTaskContainer>
      </PlayPage>
    </>
  );
};

export default PlayTaskContainer;

const SPlayTaskContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
