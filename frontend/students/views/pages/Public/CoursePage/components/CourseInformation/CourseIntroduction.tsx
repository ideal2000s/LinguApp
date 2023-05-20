import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { t } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import { ICourseDetails } from 'students/models';

import CourseMetric from './CourseMetric';
import bookIcon from '../../../assets/book_icon.svg';
import clockIcon from '../../../assets/clock_icon.svg';
import messageIcon from '../../../assets/message_icon.svg';

interface ICourseMetric {
  course: ICourseDetails;
  className?: string;
}

const CourseIntroduction: FC<ICourseMetric> = ({ course, className }) => (
  <SWrapper className={cn(className)}>
    <SMetricsWrapper>
      <SCourseMetric
        icon={bookIcon}
        text={`${course.lessonsCount || 0} ${t('frontend.course.lessons')}`}
      />

      <SCourseMetric
        icon={clockIcon}
        text={`~${course.estimatedTime} ${t('frontend.course.hours')}`}
      />

      <SCourseMetric
        icon={messageIcon}
        text={`${course.wordsCount || 0} ${t('frontend.course.words')}`}
      />
    </SMetricsWrapper>

    <SIntroductionText dangerouslySetInnerHTML={{ __html: course.description.trim() }} />
  </SWrapper>
);

export default CourseIntroduction;

const SWrapper = styled.div`
  margin: 0 0 24px;
  display: flex;
  flex-direction: column-reverse;

  ${customMediaQuery('tablet')} {
    margin: 0 0 60px;
    flex-direction: row;
  }
`;

const SMetricsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${customMediaQuery('tablet')} {
    margin-right: 30px;
    flex-direction: column;
    max-width: 160px;
    justify-content: unset;
  }
`;

const SIntroductionText = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  color: #2d2d3a;
  margin: 0 0 30px;
  padding: 0;

  .trix-content {
    line-height: 1.5rem;
  }

  ${customMediaQuery('tablet')} {
    .trix-content {
      line-height: 1.75rem;
    }

    margin: 0;
  }
`;

const SCourseMetric = styled(CourseMetric)`
  margin-bottom: 12px;
`;
