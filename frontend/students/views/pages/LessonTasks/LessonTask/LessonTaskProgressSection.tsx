import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TaskProgressCollapse from 'students/views/shared/components/TaskProgressCollapse';
import { customMediaQuery } from 'students/views/shared/styled';
import { ITaskSectionProgress } from 'students/models';

interface IProps {
  index: number;
  icon: string;
  opened?: boolean;
  textLocaleKey: string;
  activeTaskId?: number;
  sectionData?: ITaskSectionProgress;
  onOpenTask?: () => void;
  onOpenSection?: (sectionIndex: number) => void;
}

const LessonTaskProgressSection: React.FC<IProps> = ({
  index,
  icon,
  opened = false,
  textLocaleKey,
  sectionData,
  activeTaskId,
  onOpenTask,
  onOpenSection
}) => {
  const [sectionOpened, setSectionOpened] = useState(false);
  const sectionKey = sectionData?.title;

  useEffect(() => {
    setSectionOpened(opened);
  }, [opened, sectionKey]);

  const onOpenChange = (value: boolean) => {
    onOpenSection && onOpenSection(index);
    setSectionOpened(value);
  };

  return (
    <SSection>
      {!!index && <SSectionSeparator />}
      <STaskWrapper>
        <TaskProgressCollapse
          opened={sectionOpened}
          defaultIcon={icon}
          sectionData={sectionData}
          onOpenChange={onOpenChange}
          textLocaleKey={textLocaleKey}
          activeTaskId={activeTaskId}
          onOpenTask={onOpenTask}
        />
      </STaskWrapper>
    </SSection>
  );
};

export default LessonTaskProgressSection;

const SSectionSeparator = styled.div`
  border-left: 4px dotted #ffffff;
  transform: scale(0.5);
  height: 30px;
  opacity: 0.5;
  margin-left: 1.75rem;
  margin-top: -4px;
  margin-bottom: -4px;

  ${customMediaQuery('tablet')} {
    margin-top: -1.375rem;
    margin-bottom: -1.375rem;
    margin-left: 2.7rem;
  }
`;

const SSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const STaskWrapper = styled.div`
  width: 100%;
`;
