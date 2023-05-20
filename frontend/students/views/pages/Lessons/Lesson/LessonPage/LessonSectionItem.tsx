import React, { useCallback, useMemo, useState } from 'react';
import _reduce from 'lodash/reduce';
import styled from 'styled-components';
import { ILesson, ITaskSectionProgress, tSectionType } from 'students/models';
import TaskProgressCollapse from 'students/views/shared/components/TaskProgressCollapse';
import { SLessonSectionItemsSeparator } from './styled';
import { customMediaQuery } from 'students/views/shared/styled';

interface IProps {
  sectionData?: ITaskSectionProgress;
  icon: string;
  sectionKey: tSectionType;
  textLocaleKey: string;
  infoLocaleKey?: string;
  lesson?: Pick<ILesson, 'averageDuration' | 'phrasesCount'>;
  index: number;
  startTask?: (subject: tSectionType, taskId: number) => void;
}

const LessonSectionItem: React.FC<IProps> = ({
  sectionData,
  icon,
  sectionKey,
  textLocaleKey,
  infoLocaleKey,
  lesson,
  index
}) => {
  const [sectionOpened, setSectionOpened] = useState(false);
  const averageDuration = lesson?.averageDuration;
  const phrasesCount = lesson?.phrasesCount;
  const sectionTasks = sectionData?.tasks;

  const activityCount = useMemo(() => {
    if (sectionKey === 'teach') return averageDuration;
    if (sectionKey === 'engage') return phrasesCount;
    return sectionTasks?.length;
  }, [sectionKey, averageDuration, phrasesCount, sectionTasks]);

  const onOpenChange = useCallback((value) => setSectionOpened(value), []);

  return (
    <>
      {!!index && <SLessonSectionItemsSeparator />}

      <SLessonSectionItem $opened={sectionOpened}>
        <TaskProgressCollapse
          hoverDisabled={!sectionTasks?.length}
          defaultIcon={icon}
          textLocaleKey={textLocaleKey}
          infoLocaleKey={infoLocaleKey}
          sectionData={sectionData}
          activityCount={activityCount || 0}
          opened={sectionOpened}
          onOpenChange={onOpenChange}
        />
      </SLessonSectionItem>
    </>
  );
};

export default LessonSectionItem;

const SLessonSectionItem = styled.div<{
  $opened: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.25rem;
  width: 100%;
  cursor: pointer;
  overflow: hidden;

  ${customMediaQuery('tablet')} {
    background: ${(props) =>
      props.$opened ? 'rgba(28, 16, 55, 0.1)' : 'rgba(28, 16, 55, 0.2)'};
    border-radius: 0.875rem;
    width: 30%;
    justify-content: flex-start;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(28, 16, 55, 0.1);
    }
  }
`;
