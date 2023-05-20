import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import Page from 'students/views/pages/Page';
import { LessonTaskHeader } from 'students/views/pages/LessonTasks/LessonTask';
import {
  getBackgroundColorIfLoaded,
  DEFAULT_LESSON_BACKGROUND
} from 'students/views/pages/Lessons/Lesson/LessonPage/helpers';
import { isLightFontNeeded } from 'students/views/shared/helpers';
import bgRight from 'students/views/shared/assets/bgLightBubbles/bgLightBubbleRight.svg';
import bgLeft from 'students/views/shared/assets/bgLightBubbles/bgLightBubbleLeft.svg';
import { tLearnTaskType } from 'students/models/lessonTasks';
import { SpinnerBlock } from 'students/views/shared/components/Spinner';

import { learnTaskMap } from './Tasks';
import { tSubjectComponentProps } from '..';
import NotSupportedTask from '../../NotSupportedTask';

export interface ILearnSubjectComponentProps extends tSubjectComponentProps {
  task: tLearnTaskType;
}

const LearnTaskContainer: React.FC<ILearnSubjectComponentProps> = ({
  lesson,
  task,
  taskSession,
  isLoading,
  onFinishAndNext,
  onExit,
  isCompleting
}) => {
  const finishTask = useCallback(() => {
    if (!isCompleting) {
      onFinishAndNext(
        taskSession?.taskItemSessions.map((item) => ({
          ...item,
          completed: true
        }))
      );
    }
  }, [onFinishAndNext, taskSession, isCompleting]);

  const { gradient, background } = getBackgroundColorIfLoaded(
    lesson?.color || null,
    !!lesson
  );
  const isLightFont = isLightFontNeeded(background);
  const TaskComponent = learnTaskMap.get(task.type);

  const taskBody = useMemo(() => {
    let currentTaskBody: JSX.Element | null = null;
    if (isLoading) {
      currentTaskBody = (
        <SSpinnerWrapper>
          <SpinnerBlock />
        </SSpinnerWrapper>
      );
    } else {
      currentTaskBody = TaskComponent ? (
        <TaskComponent
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          task={task}
          onFinish={finishTask}
          lightFont={isLightFont}
          isCompleting={!!isCompleting}
        />
      ) : (
        <NotSupportedTask
          onNext={finishTask}
          color={lesson?.color || DEFAULT_LESSON_BACKGROUND}
          isCompleting={!!isCompleting}
        />
      );
    }

    return currentTaskBody;
  }, [
    isCompleting,
    isLoading,
    TaskComponent,
    task,
    isLightFont,
    finishTask,
    lesson?.color
  ]);

  return (
    <Page
      background={background}
      gradient={gradient}
      bgImage={`url(${bgLeft}), url(${bgRight})`}
    >
      <LessonTaskHeader
        lessonTitle={lesson?.title}
        lightFont={isLightFont}
        onClose={onExit}
      />
      {taskBody}
    </Page>
  );
};

export default LearnTaskContainer;

const SSpinnerWrapper = styled.div`
  flex-grow: 1;
  display: grid;
  place-content: center;
`;
