import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { useBreakPoint } from 'students/views/shared/hooks';
import { customMediaQuery } from 'students/views/shared/styled';
import { ILanguage } from 'students/models';

import LanguageMetric from '../../../components/LanguageMetric';
import bookIcon from '../../../assets/book_icon.svg';
import clockIcon from '../../../assets/clock_icon.svg';
import messageIcon from '../../../assets/message_icon.svg';

interface ICourseMetrics {
  duration: number;
  lessonsCount: number;
  wordCount: number;
  language: ILanguage;
  level: string;
  className?: string;
}

const CourseMetrics: FC<ICourseMetrics> = ({
  duration,
  lessonsCount,
  wordCount,
  language,
  level,
  className
}) => {
  const isMobile = useBreakPoint('sm', true);

  return (
    <SWrapper className={cn(className)}>
      <SLanguageMetricWrapper>
        <LanguageMetric language={language} level={level} />
      </SLanguageMetricWrapper>

      <SFlexWrapper>
        <SMetric>
          <UrlIcon
            url={bookIcon}
            height="16px"
            width="16px"
            color={isMobile ? 'rgb(178, 227, 241)' : '#ffffff'}
          />

          <SText>
            {lessonsCount} <Translate str="frontend.course.lessons" />
          </SText>
        </SMetric>

        <SMetric>
          <UrlIcon
            url={clockIcon}
            height="16px"
            width="16px"
            color={isMobile ? 'rgb(178, 227, 241)' : '#ffffff'}
          />

          <SText>
            {duration} <Translate str="frontend.course.min" />
          </SText>
        </SMetric>

        <SMetric>
          <UrlIcon
            url={messageIcon}
            height="16px"
            width="16px"
            color={isMobile ? 'rgb(178, 227, 241)' : '#ffffff'}
          />

          <SText>
            {wordCount} <Translate str="frontend.course.words" />
          </SText>
        </SMetric>
      </SFlexWrapper>
    </SWrapper>
  );
};

export default CourseMetrics;

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 0 10px;

  ${customMediaQuery('tablet')} {
    align-items: flex-start;
    justify-content: flex-start;
  }

  ${customMediaQuery('desktop')} {
    align-items: center;
    flex-direction: row;
    margin: 0 0 20px;
  }
`;

const SFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const SLanguageMetricWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  ${customMediaQuery('tablet')} {
    margin-bottom: 1.25rem;
    margin-right: 2rem;
  }

  ${customMediaQuery('desktop')} {
    margin-bottom: 0;
  }
`;

const SMetric = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;

  & > div {
    margin-right: 4px;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const SText = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
  color: rgb(178, 227, 241);
  margin: 0;
  padding: 0;
  text-transform: lowercase;

  ${customMediaQuery('tablet')} {
    font-size: 0.875rem;
    line-height: 1.125rem;
    color: #ffffff;
  }
`;
