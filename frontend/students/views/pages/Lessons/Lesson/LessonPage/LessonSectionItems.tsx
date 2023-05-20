import React, { useMemo } from 'react';
import { ILesson, ISections, tSectionType } from 'students/models';
import playIcon from 'students/views/shared/assets/icons/play_icon.svg';
import LessonSectionItem from './LessonSectionItem';
import { SLessonSectionsBlock } from './styled';

interface IProps {
  lesson: ILesson;
  lessonSessionSection?: ISections;
  startTask?: (subject: tSectionType, taskId: number) => void;
}

export const LessonSectionItems: React.FC<IProps> = ({
  lesson,
  lessonSessionSection,
  startTask
}) => {
  const lessonSections = useMemo(() => {
    if (lessonSessionSection) {
      return lessonSessionSection;
    }
    return lesson.subjects?.reduce((obj, subject) => {
      const mappedTasks = subject.tasks.map((task) => ({
        progress: 0,
        title: task.name
      }));

      return {
        ...obj,
        [subject.subject]: {
          progress: 0,
          tasks: mappedTasks,
          title: subject.subject
        }
      };
    }, {} as ISections);
  }, [lesson, lessonSessionSection]);

  return (
    <SLessonSectionsBlock className="lesson-sections">
      {sectionItems.map((item, index) => {
        const sectionData = lessonSections && lessonSections[item.sectionKey];
        return (
          <LessonSectionItem
            key={index}
            index={index}
            icon={item.icon}
            lesson={lesson}
            sectionData={sectionData}
            sectionKey={item.sectionKey}
            textLocaleKey={item.textLocaleKey}
            infoLocaleKey={item.infoLocaleKey}
            startTask={startTask}
          />
        );
      })}
    </SLessonSectionsBlock>
  );
};

const sectionItems: {
  textLocaleKey: string;
  infoLocaleKey: string;
  sectionKey: tSectionType;
  icon: string;
}[] = [
  {
    textLocaleKey: 'frontend.lesson_page.section_learn',
    infoLocaleKey: 'frontend.lesson_page.section_learn_info',
    sectionKey: 'teach',
    icon: playIcon
  },
  {
    textLocaleKey: 'frontend.lesson_page.section_play',
    infoLocaleKey: 'frontend.lesson_page.section_play_info',
    sectionKey: 'engage',
    icon: playIcon
  },
  {
    textLocaleKey: 'frontend.lesson_page.section_check',
    infoLocaleKey: 'frontend.lesson_page.section_check_info',
    sectionKey: 'test',
    icon: playIcon
  }
];
