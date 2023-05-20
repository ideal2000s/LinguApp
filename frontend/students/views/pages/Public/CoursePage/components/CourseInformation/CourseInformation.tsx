import React, { FC } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Sticky } from 'react-sticky';
import { Translate } from 'i18n';
import { ICourseDetails } from 'students/models';
import { customMediaQuery, SPrimaryButton } from 'students/views/shared/styled';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';

import Rating from './Rating';
import StickyHeader from './StickyHeader';
import Title from './Title';
import Banner from './Banner';
import CourseIntroduction from './CourseIntroduction';
import LanguageMetric from '../../../components/LanguageMetric';

interface ICourseInformation {
  course: ICourseDetails;
}

const CourseInformation: FC<ICourseInformation> = ({ course }) => {
  const history = useHistory();

  const navigateToLesson = () => {
    /* [TODO] temporary redirect to the first lesson in the course */
    const lessonId = course?.courseSections[0]?.lessons[0]?.id;
    lessonId && history.push(`/lessons/${lessonId}`);
  };

  return (
    <SWrapper>
      <SLessonInfo>
        <STransparentLanguageMetric language={course.language} level={course.level} />

        <Rating rating={course.rating || 0} reviewsCount={course.reviews?.length || 0} />
      </SLessonInfo>

      <STitle title={course.title} navigateToLesson={navigateToLesson} />

      <Sticky disableCompensation>
        {({ style, isSticky }: { style: Record<string, any>; isSticky: boolean }) => (
          <div style={{ ...style, left: 0, width: '100%', zIndex: 1 }}>
            <StickyHeader
              course={course}
              isSticky={isSticky}
              navigateToLesson={navigateToLesson}
            />
          </div>
        )}
      </Sticky>

      <SBanner imageUrl={course.imageURL || ''} title={course.title} />

      <SCourseIntroduction course={course} />

      <SMobileBottomBlock>
        <SLanguageMetric language={course.language} level={course.level} />

        <SActionButton onClick={navigateToLesson}>
          <Translate str="frontend.course.try_this_course" />
        </SActionButton>
      </SMobileBottomBlock>
    </SWrapper>
  );
};

export default CourseInformation;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e6e6f0;
  margin-bottom: 30px;

  ${customMediaQuery('tablet')} {
    margin-bottom: 40px;
  }
`;

const SLessonInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  order: 2;

  ${customMediaQuery('tablet')} {
    order: 1;
  }
`;

const STitle = styled(Title)`
  order: 3;

  ${customMediaQuery('tablet')} {
    order: 2;
  }
`;

const SBanner = styled(Banner)`
  order: 1;

  ${customMediaQuery('tablet')} {
    order: 3;
  }
`;

const SCourseIntroduction = styled(CourseIntroduction)`
  order: 4;
`;

const SMobileBottomBlock = styled.div`
  z-index: 99;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(4px);
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${customMediaQuery('tablet')} {
    display: none;
  }
`;

const STransparentLanguageMetric = styled(LanguageMetric)`
  ${styleInnerButton()} {
    background: transparent;
  }
`;

const SLanguageMetric = styled(LanguageMetric)`
  background: transparent;
  font-size: 1rem;
`;

const SActionButton = styled(SPrimaryButton)`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin: 0;
  min-height: 3rem;
  max-height: 3rem;

  ${styleInnerButton()} {
    padding: 0.75rem 1.5rem;
  }
`;
