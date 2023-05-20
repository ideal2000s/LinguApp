import React from 'react';
import styled from 'styled-components';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import { useBreakPoint } from 'students/views/shared/hooks';

import clockIcon from '../../../assets/clock_icon.svg';
import messageIcon from '../../../assets/message_icon.svg';

interface IProps {
  duration: number;
  phrasesCount: number;
}

const LessonDurationMetrics: React.FC<IProps> = ({ duration, phrasesCount }) => {
  const isTablet = useBreakPoint('md');

  return (
    <>
      <SMetric>
        {isTablet && <SIcon src={clockIcon} />}

        <SText>
          {duration} <Translate str="frontend.course.min" />
        </SText>
      </SMetric>
      {!isTablet && <SBullet>•</SBullet>}
      <SMetric>
        {isTablet && <SIcon src={messageIcon} />}

        <SText>
          {phrasesCount} <Translate str="frontend.course.words" />
        </SText>
      </SMetric>
    </>
  );
};

export default LessonDurationMetrics;

const SMetric = styled.div`
  display: flex;
  align-items: center;

  ${customMediaQuery('tablet')} {
    margin-right: 8px;
  }
`;

const SIcon = styled.div<{ src: string }>`
  display: inline-block;
  background-image: url(${({ src }) => src});
  margin-right: 4px;
  height: 15px;
  width: 15px;
  min-width: 15px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  fill: #5e5d71;
`;

const SText = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.125rem;
  color: #5e5d71;
  margin: 0;
  padding: 0;
  text-transform: lowercase;

  ${customMediaQuery('tablet')} {
    font-size: 0.875rem;
    line-height: 1.125rem;
  }
`;

const SBullet = styled.span`
  font-size: 0.5rem;
  line-height: 1rem;
  display: inline-block;
  margin: 0 6px;
  color: #e6e6f0;
`;
