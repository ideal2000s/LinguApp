import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import noScroll from 'no-scroll';
import playIcon from 'students/views/shared/assets/icons/play_icon.svg';
import { useBreakPoint, useOutsideClick } from 'students/views/shared/hooks';
import { customMediaQuery } from 'students/views/shared/styled';
import { ITaskSession } from 'students/models';
import LessonTaskProgressSection from 'students/views/pages/LessonTasks/LessonTask/LessonTaskProgressSection';
import CircleProgress from 'students/views/shared/components/CircleProgress';

interface ILessonTaskProgress {
  taskSession?: ITaskSession | null;
  isLoading?: boolean;
}

const LessonTaskProgress: React.FC<ILessonTaskProgress> = ({
  isLoading,
  taskSession
}) => {
  const [progressValue, setProgressValue] = useState<number | null>(null);
  const [opened, setOpened] = useState(false);
  const [openedSection, setOpenedSection] = useState<number | null>(null);
  const popoverRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLElement>(null);
  const sectionsData = taskSession?.lessonSession?.summary;
  const progressPercents = taskSession?.lessonSession?.progressSummary.percents;
  const isMobile = useBreakPoint('sm', true);

  useEffect(() => {
    if (!isLoading && progressPercents) {
      setProgressValue(progressPercents);
    }
  }, [isLoading, progressPercents]);

  const handleOpen = () => {
    noScroll.on();
    setOpened(true);
  };

  const handleClose = () => {
    noScroll.off();
    setOpened(false);
  };

  useOutsideClick(popoverRef, handleClose, [backdropRef]);

  const handleSectionOpen = (sectionIndex: number) => {
    if (isMobile) {
      setOpenedSection(sectionIndex);
    }
  };

  return (
    <SProgressBlock>
      <SButton onClick={handleOpen}>
        {!opened && (
          <CircleProgress
            showValue
            progress={progressValue || 0}
            color="#D7DF21"
            stroke={6}
            radius={26.5}
          />
        )}
      </SButton>
      <SBackdrop $opened={opened} onClick={handleClose} ref={backdropRef as any} />
      <SProgressPopover $opened={opened} ref={popoverRef as any}>
        <SScrollView>
          <SProgressWrapper>
            {sectionItems.map((item, index) => {
              const sectionData = sectionsData?.[item.sectionKey];
              const isSectionOpened =
                isMobile && openedSection !== null
                  ? openedSection === index
                  : taskSession?.subject === item.sectionKey;
              return (
                <LessonTaskProgressSection
                  key={index}
                  icon={item.icon}
                  index={index}
                  opened={isSectionOpened}
                  sectionData={sectionData}
                  textLocaleKey={item.textLocaleKey}
                  activeTaskId={taskSession?.taskId}
                  onOpenTask={handleClose}
                  onOpenSection={handleSectionOpen}
                />
              );
            })}
          </SProgressWrapper>
        </SScrollView>
      </SProgressPopover>
    </SProgressBlock>
  );
};

export default LessonTaskProgress;

const sectionItems: {
  sectionKey: 'teach' | 'engage' | 'test';
  textLocaleKey: string;
  icon: string;
}[] = [
  {
    sectionKey: 'teach',
    textLocaleKey: 'frontend.lesson_page.section_learn',
    icon: playIcon
  },
  {
    sectionKey: 'engage',
    textLocaleKey: 'frontend.lesson_page.section_play',
    icon: playIcon
  },
  {
    sectionKey: 'test',
    textLocaleKey: 'frontend.lesson_page.section_check',
    icon: playIcon
  }
];

const SProgressBlock = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 999;

  ${customMediaQuery('desktop')} {
    left: 3rem;
  }
`;

const SBackdrop = styled.div<{
  $opened: boolean;
}>`
  display: ${(props) => (props.$opened ? 'block' : 'none')};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;

  ${customMediaQuery('desktop')} {
    display: none;
  }
`;

const SProgressPopover = styled.div<{
  $opened: boolean;
}>`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background: rgba(28, 16, 55, 0.7);
  backdrop-filter: blur(10px);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  color: #fff;
  flex-direction: column;
  align-items: flex-start;
  z-index: 999;
  transition: all 0.3s ease;
  bottom: ${(props) => (props.$opened ? '0' : '-100%')};
  max-height: 90vh;
  overflow: hidden;

  ${customMediaQuery('desktop')} {
    position: absolute;
    display: ${(props) => (props.$opened ? 'flex' : 'none')};
    top: 0;
    left: 0;
    bottom: auto;
    width: 336px;
    border-radius: 20px;
    background: rgba(28, 16, 55, 0.5);
  }
`;

const SScrollView = styled.div`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 100px;
  }
  overflow: auto;
  padding: 1rem;
  width: 100%;
  height: 100%;
`;

const SProgressWrapper = styled.div`
  padding: 1rem 0;
  width: 100%;

  ${customMediaQuery('desktop')} {
    padding: 0;
  }
`;

const SButton = styled.button`
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border-radius: 17px;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border: none;
  transition: opacity 0.1s ease;
  padding: 0;

  &:hover,
  &:focus,
  &:active {
    border: none;
    outline: none;
  }
`;
