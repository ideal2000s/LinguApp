import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import { customMediaQuery, SPrimaryButton } from 'students/views/shared/styled';
import { ICourseDetails } from 'students/models';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';

import LanguageMetric from '../../../components/LanguageMetric';
import bookIcon from '../../../assets/book_icon.svg';
import clockIcon from '../../../assets/clock_icon.svg';
import messageIcon from '../../../assets/message_icon.svg';

interface IStickyHeader {
  course: ICourseDetails;
  isSticky: boolean;
  navigateToLesson: () => void;
  className?: string;
}

const StickyHeader: FC<IStickyHeader> = ({
  course,
  isSticky,
  navigateToLesson,
  className
}) => (
  <SContainer>
    <SWrapper className={cn(className)} isSticky={isSticky}>
      <SFlex>
        <SLanguageMetric language={course.language} level={course.level} />

        <SMetricsWrapper>
          <SMetricBlock>
            <SMetricIcon src={bookIcon} />

            <SMetricText>
              {course.lessonsCount} <Translate str="frontend.course.lessons" />
            </SMetricText>
          </SMetricBlock>

          <SMetricBlock>
            <SMetricIcon src={clockIcon} />

            <SMetricText>
              ~{course.estimatedTime} <Translate str="frontend.course.hours" />
            </SMetricText>
          </SMetricBlock>

          <SMetricBlock>
            <SMetricIcon src={messageIcon} />

            <SMetricText>
              {course.wordsCount} <Translate str="frontend.course.words" />
            </SMetricText>
          </SMetricBlock>
        </SMetricsWrapper>
      </SFlex>

      <SActionButton onClick={navigateToLesson}>
        <Translate str="frontend.course.try_this_course" />
      </SActionButton>
    </SWrapper>
  </SContainer>
);

export default StickyHeader;

const SContainer = styled.div`
  background: #ffffff;
  opacity: 0.98;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: none;

  ${customMediaQuery('tablet')} {
    display: block;
  }
`;

const SLanguageMetric = styled(LanguageMetric)`
  background: transparent;
`;

const SWrapper = styled.div<{ isSticky: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1040px;
  margin: 0 auto;
  opacity: ${({ isSticky }) => (isSticky ? 1 : 0)};
  height: ${({ isSticky }) => (isSticky ? 'auto' : 0)};
  transition: ${({ isSticky }) => (isSticky ? 'opacity .4s' : 'none')};
`;

const SFlex = styled.div`
  display: flex;
  align-items: center;
`;

const SActionButton = styled(SPrimaryButton)`
  display: none;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  box-shadow: none;
  align-self: flex-end;
  min-height: 3rem;
  max-height: 3rem;

  ${styleInnerButton()} {
    padding: 0.5rem 1.5rem;
  }

  ${customMediaQuery('tablet')} {
    display: block;
  }
`;

const SMetricsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 24px;
`;

const SMetricBlock = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const SMetricIcon = styled.div<{ src: string }>`
  display: inline-block;
  background-image: url(${({ src }) => src});
  margin: 0;
  height: 16px;
  width: 16px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const SMetricText = styled.h3`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1rem;
  color: #2d2d3a;
  margin: 0 0 0 4px;
  padding: 0;
  text-transform: lowercase;
`;
