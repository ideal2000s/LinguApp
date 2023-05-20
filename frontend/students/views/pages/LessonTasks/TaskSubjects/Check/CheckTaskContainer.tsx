import React, { FC, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import Page from 'students/views/pages/Page';
import { LessonTaskHeader } from 'students/views/pages/LessonTasks/LessonTask';
import { isLightFontNeeded } from 'students/views/shared/helpers';
import bgRight from 'students/views/shared/assets/bgLightBubbles/bgLightBubbleRight.svg';
import bgLeft from 'students/views/shared/assets/bgLightBubbles/bgLightBubbleLeft.svg';
import {
  getBackgroundColorIfLoaded,
  DEFAULT_LESSON_BACKGROUND
} from 'students/views/pages/Lessons/Lesson/LessonPage/helpers';

import { checkTaskMap } from './Tasks';
import { tSubjectComponentProps } from '..';
import NotSupportedTask from '../../NotSupportedTask';
import { tCheckTaskType, tAnswer } from 'students/models';
import { SpinnerBlock } from 'students/views/shared/components/Spinner';

export interface ICheckSubjectComponentProps extends tSubjectComponentProps {
  task: tCheckTaskType;
}

const CheckTaskContainer: FC<ICheckSubjectComponentProps> = ({
  lesson,
  task,
  taskSession,
  isLoading,
  onFinishAndNext,
  onExit,
  isCompleting
}) => {
  const TaskComponent = checkTaskMap.get(task.type);

  const { gradient, background } = getBackgroundColorIfLoaded(
    lesson?.color || null,
    !!lesson
  );

  const isLightFont = isLightFontNeeded(background);

  const handleNext = useCallback(
    (answers: tAnswer) => {
      if (!isCompleting) {
        onFinishAndNext(answers);
      }
    },
    [isCompleting, onFinishAndNext]
  );

  const handleSkip = useCallback(() => {
    if (!isCompleting) {
      onFinishAndNext();
    }
  }, [isCompleting, onFinishAndNext]);

  const taskBody = useMemo(() => {
    let currentTaskBody: JSX.Element | null;
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          taskSession={taskSession}
          isCompleting={!!isCompleting}
          onNext={handleNext}
          onSkip={handleSkip}
        />
      ) : (
        <NotSupportedTask
          onNext={handleSkip}
          color={lesson?.color || DEFAULT_LESSON_BACKGROUND}
          isCompleting={!!isCompleting}
        />
      );
    }

    return currentTaskBody;
  }, [
    TaskComponent,
    handleNext,
    handleSkip,
    isCompleting,
    isLoading,
    lesson?.color,
    task,
    taskSession
  ]);

  return (
    <SPage gradient={gradient} bgImage={`url(${bgLeft}), url(${bgRight})`}>
      <LessonTaskHeader
        lessonTitle={lesson?.title}
        onClose={onExit}
        lightFont={isLightFont}
      />

      {taskBody}
    </SPage>
  );
};

export default CheckTaskContainer;

const SPage = styled(Page)`
  justify-content: space-between;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    justify-content: normal;
  }
`;

const SSpinnerWrapper = styled.div`
  flex-grow: 1;
  display: grid;
  place-content: center;
`;
