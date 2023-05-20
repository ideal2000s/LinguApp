import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import { ILanguage } from 'students/models';

import LessonDurationMetrics from './LessonDurationMetrics';
import LanguageMetric from '../../../components/LanguageMetric';

interface ILessonMetrics {
  duration: number;
  phrasesCount: number;
  language: ILanguage;
  level: string;
  supportLanguage: string | null;
  className?: string;
}

const LessonMetrics: FC<ILessonMetrics> = ({
  duration,
  phrasesCount,
  language,
  level,
  supportLanguage,
  className
}) => (
  <SWrapper className={cn(className)}>
    <SMetric>
      <LanguageMetric language={language} level={level} />
    </SMetric>

    {supportLanguage && (
      <SMetric>
        <SSupportLanguage>
          <Translate
            str="frontend.course.in_language"
            params={{ language: supportLanguage }}
          />
        </SSupportLanguage>
      </SMetric>
    )}

    <SHideOnMobile>
      <LessonDurationMetrics duration={duration} phrasesCount={phrasesCount} />
    </SHideOnMobile>
  </SWrapper>
);

export default LessonMetrics;

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  flex-wrap: wrap;
  margin: 0 0 10px;

  ${customMediaQuery('tablet')} {
    margin: 0 0 20px;
  }
`;

export const SMetric = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

const SSupportLanguage = styled.div`
  background: #f0f0f3;
  border-radius: 6px;
  padding: 5px 6px;
  width: max-content;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: #5e5d71;

  ${customMediaQuery('tablet')} {
    font-size: 1rem;
    line-height: 1.25rem;
  }
`;

export const SHideOnMobile = styled.div`
  display: none;

  ${customMediaQuery('desktop')} {
    display: flex;
  }
`;
