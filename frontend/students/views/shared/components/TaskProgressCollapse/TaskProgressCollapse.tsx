import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Translate } from 'i18n';
import { ITaskSectionProgress } from 'students/models';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import arrowCollapse from 'students/views/shared/assets/icons/arrow_collapse.svg';
import doneIcon from 'students/views/shared/assets/icons/done_icon.svg';
import CircleProgress from 'students/views/shared/components/CircleProgress';
import { customMediaQuery } from 'students/views/shared/styled';
import { useBreakPoint } from 'students/views/shared/hooks';
import ButtonGeneral from '../ButtonGeneral';
import { styleInnerButton } from '../ButtonGeneral/ButtonGeneral';
import useTaskProgressCollapse from './useTaskProgressCollapse';

interface IProps {
  textLocaleKey: string;
  defaultIcon: string;
  sectionData?: ITaskSectionProgress;
  activityCount?: number;
  infoLocaleKey?: string;
  hoverDisabled?: boolean;
  opened?: boolean;
  activeTaskId?: number;
  onOpenChange?: (value: boolean) => void;
  onOpenTask?: () => void;
}

const TaskProgressCollapse: React.FC<IProps> = ({
  textLocaleKey,
  defaultIcon,
  sectionData,
  activityCount,
  infoLocaleKey,
  hoverDisabled = false,
  opened = false,
  activeTaskId,
  onOpenChange,
  onOpenTask
}) => {
  const sectionTasks = sectionData?.tasks;
  const isMobile = useBreakPoint('md', true);
  const { taskPath, progress: sectionProgress } = useTaskProgressCollapse(sectionTasks);
  const iconSize = isMobile ? '2.5rem' : '2.625rem';
  const isSectionProgressBegin =
    sectionProgress === 0 &&
    !!activeTaskId &&
    sectionData?.tasks.map((task) => task.id).includes(activeTaskId);

  const handleItemOpen = useCallback(() => {
    if (sectionTasks && sectionTasks.length > 0) {
      onOpenChange && onOpenChange(!opened);
    }
  }, [sectionTasks, onOpenChange, opened]);

  const handleTaskClick = () => {
    onOpenTask && onOpenTask();
  };

  return (
    <>
      <SHead
        hoverDisabled={hoverDisabled}
        className="section-progress-header"
        onClick={handleItemOpen}
        $opened={opened}
      >
        <SHeadIcon
          inProgress={
            isSectionProgressBegin || (sectionProgress > 0 && sectionProgress !== 100)
          }
        >
          <CircleProgress
            showValue={!isSectionProgressBegin}
            progress={isSectionProgressBegin ? 20 : sectionProgress}
            color="#D7DF21"
            stroke={6}
            radius={isMobile ? 30 : 26.5}
            doneIcon={() => <UrlIcon url={doneIcon} height={iconSize} width={iconSize} />}
            zeroProgressIcon={() => (
              <UrlIcon
                url={defaultIcon}
                height={iconSize}
                width={iconSize}
                color="#ffffff"
              />
            )}
          />
        </SHeadIcon>
        <SHeadTitle $completed={sectionProgress === 100}>
          <Translate str={textLocaleKey} />
          <SHeadTitleInfo>
            {infoLocaleKey && (
              <Translate str={infoLocaleKey} params={{ count: activityCount || 0 }} />
            )}
          </SHeadTitleInfo>
        </SHeadTitle>
        {sectionTasks && sectionTasks.length > 0 && (
          <SExpandIcon $opened={opened}>
            <UrlIcon url={arrowCollapse} height="14px" width="14px" color="#ffffff" />
          </SExpandIcon>
        )}
      </SHead>
      <AnimatePresence initial={false}>
        {opened && (
          <SCollapse
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3 }}
          >
            <STasksList onClick={(e) => e.stopPropagation()}>
              {sectionTasks?.map((task, index) => {
                const isTaskInProgress =
                  activeTaskId && activeTaskId === task.id && task.progress !== 100;
                return (
                  <STask key={index}>
                    <STaskLink to={taskPath + task.id} onClick={handleTaskClick}>
                      <STaskIcon>
                        <STaskSeparator />
                        <CircleProgress
                          radius={8.5}
                          progress={isTaskInProgress ? 25 : task.progress}
                          color="#D7DF21"
                          stroke={3}
                          doneIcon={() => (
                            <SSmallDoneIcon url={doneIcon} height="20px" width="20px" />
                          )}
                        />
                      </STaskIcon>
                      <STaskTittle
                        $active={activeTaskId ? activeTaskId === task.id : true}
                      >
                        {task.title}
                      </STaskTittle>
                    </STaskLink>
                  </STask>
                );
              })}
            </STasksList>
          </SCollapse>
        )}
      </AnimatePresence>
    </>
  );
};

export default TaskProgressCollapse;

const SHead = styled(ButtonGeneral)<{
  hoverDisabled: boolean;
  $opened?: boolean;
}>`
  position: relative;
  display: flex;
  font-size: 1.25rem;
  width: 100%;
  cursor: pointer;
  background: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-sizing: border-box;

  ${styleInnerButton()} {
    justify-content: flex-start;
    align-items: center;
    padding: 0 0.5rem;
    text-align: left;
  }

  ${customMediaQuery('tablet')} {
    ${styleInnerButton()} {
      box-sizing: border-box;
      border: 2px solid transparent;
      padding: 1.375rem 1.25rem;
    }

    ${styleInnerButton('focus')} {
      background: ${({ $opened }) => (!$opened ? 'rgba(255, 255, 255, 0.05)' : 'none')};
      border: 2px solid rgba(251, 252, 255, 0.5);
      box-shadow: none;
    }
  }
`;

const SHeadIcon = styled.div<{
  inProgress: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  margin-right: 1.5rem;
  margin-top: ${(props) => (props.inProgress ? '0.6rem' : '0')};
  margin-bottom: ${(props) => (props.inProgress ? '0.6rem' : '0')};

  ${customMediaQuery('tablet')} {
    height: 2.625rem;
    width: 2.625rem;
    transform: none;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 0.875rem;
  }
`;

const SExpandIcon = styled.div<{
  $opened: boolean;
}>`
  background: none;
  border: none;
  outline: none;
  opacity: 0.2;
  padding: 0;
  margin-right: 14.5px;
  position: absolute;
  right: 0;
  transition: opacity 0.3s ease;
  transform: ${(props) => (props.$opened ? 'none' : 'rotate(180deg)')};

  &:hover,
  &:focus,
  &:active {
    background: none;
    border: none;
    outline: none;
    opacity: 1;
  }
`;

const SCollapse = styled(motion.div)`
  width: 100%;

  ${customMediaQuery('tablet')} {
    transform: translateY(-1.25rem);
  }
`;

const STasksList = styled.ol`
  font-size: 1.25rem;
  width: 100%;
  padding: 0 0.5rem;
  margin-top: 10px;
  margin-bottom: 0;
  cursor: default;

  ${customMediaQuery('tablet')} {
    padding: 0 1.25rem;
    margin-bottom: 0;
  }
`;

const STask = styled.li`
  display: flex;
  align-items: center;
  max-width: 100%;
  width: 100%;
  height: 2rem;
  border-radius: 10px;
  margin-top: 4px;
  margin-left: 1px;
  padding-right: 10px;
  cursor: pointer;

  &:hover {
    background: rgba(256, 255, 255, 0.1);
  }

  ${customMediaQuery('tablet')} {
    justify-content: flex-start;
    margin-left: 3px;
  }
`;

const STaskLink = styled(Link)`
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none !important;
  color: #ffffff !important;
`;

const STaskSeparator = styled.div`
  position: absolute;
  top: -1.12rem;
  margin-left: 1px;
  border-left: 4px dotted #ffffff;
  transform: scale(0.5);
  height: 1.4rem;
  min-height: 1.4rem;
  opacity: 0.5;
`;

const SHeadTitle = styled.div<{ $completed: boolean }>`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  line-height: 100%;
  padding-right: 20px;
  overflow: hidden;
  opacity: ${(props) => (props.$completed ? '0.5' : '1')};
`;

const SHeadTitleInfo = styled.div`
  font-size: 0.875rem;
  line-height: 1rem;
  opacity: 0.5;
  font-weight: 400;
  margin-top: 0.3rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const STaskIcon = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 2.5rem;
  height: 1.25rem;
  margin-right: 1.375rem;

  ${customMediaQuery('tablet')} {
    margin-right: 0.875rem;
    min-width: 2.625rem;
  }
`;

const SSmallDoneIcon = styled(UrlIcon)`
  border-radius: 50%;
  background-size: 135%;
`;

const STaskTittle = styled.p<{
  $active: boolean;
}>`
  font-size: 1rem;
  line-height: 1.25rem;
  margin: 0;
  opacity: ${(props) => (!props.$active ? '0.5' : '1')};
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
`;
