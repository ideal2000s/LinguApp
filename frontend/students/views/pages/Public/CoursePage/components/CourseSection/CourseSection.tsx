import React, { FC } from 'react';
import styled from 'styled-components';
import { ICourseDetailsSection, ICourseDetailsLesson } from 'students/models';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import { useBreakPoint } from 'students/views/shared/hooks';

import LessonCard from './LessonCard';
import LessonsAccordion from './LessonsAccordion';
import LessonsCarousel from './LessonsCarousel';

interface IProps {
  section: ICourseDetailsSection;
}

const CourseSection: FC<IProps> = ({ section }) => {
  const isMobile = useBreakPoint('md', true);

  const renderLessons = () => {
    if (section.lessons.length > 2) {
      return isMobile ? (
        <LessonsCarousel lessons={section.lessons} />
      ) : (
        <LessonsAccordion lessons={section.lessons} />
      );
    }

    return (
      <>
        {section.lessons.map((lesson: ICourseDetailsLesson) => (
          <SLessonCard lesson={lesson} key={lesson.id} />
        ))}
      </>
    );
  };

  return (
    <SWrapper>
      <SHeader>
        {/* [TODO] do we need some default placeholder when there is no section name? */}
        <STitle>{section.name || 'Default placeholder'}</STitle>

        <SSubTitle>
          {section.lessons.length} <Translate str="frontend.course.lessons" />
        </SSubTitle>
      </SHeader>

      {renderLessons()}
    </SWrapper>
  );
};

export default CourseSection;

const SWrapper = styled.div`
  padding: 0 0 50px;
  border-bottom: 1px solid #e6e6f0;
  margin: 0 0 30px;

  ${customMediaQuery('tablet')} {
    padding: 0 0 40px;
    margin: 0 0 40px;
  }
`;

const SHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  ${customMediaQuery('tablet')} {
    margin-bottom: 20px;
  }
`;

const STitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 800;
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  line-height: 2.25rem;
  color: #2d2d3a;
  margin: 0;
  padding: 0;

  ${customMediaQuery('tablet')} {
    font-size: 1.75rem;
  }
`;

const SSubTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  font-family: ${({ theme }) => theme.linguTextFontFamily};
  line-height: 0.875rem;
  color: rgba(45, 45, 58, 0.5);
  margin: 0;
  padding: 0;

  ${customMediaQuery('tablet')} {
    font-size: 1.125rem;
    line-height: 1.5rem;
  }
`;

const SLessonCard = styled(LessonCard)`
  margin-bottom: 12px;
`;
