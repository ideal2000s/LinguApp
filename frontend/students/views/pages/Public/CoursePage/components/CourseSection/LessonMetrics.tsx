import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';

import clockIcon from '../../../assets/clock_icon.svg';
import messageIcon from '../../../assets/message_icon.svg';
import starIcon from '../../../assets/star_icon.svg';

interface ILessonMetrics {
  duration: number;
  phrasesCount: number;
  totalRating: number;
  ratingsCount: number;
  className?: string;
}

const LessonMetrics: FC<ILessonMetrics> = ({
  duration,
  phrasesCount,
  totalRating,
  ratingsCount,
  className
}) => (
  <SWrapper className={cn(className)}>
    <SMetric>
      <SIcon src={clockIcon} />

      <SText>
        {duration} <Translate str="frontend.course.min" />
      </SText>
    </SMetric>

    <SMetric>
      <SIcon src={messageIcon} />

      <SText>
        {phrasesCount} <Translate str="frontend.course.words" />
      </SText>
    </SMetric>

    <SMetric>
      <SIcon colored src={starIcon} />

      <SText>
        {totalRating}
        <SGreyish>({ratingsCount})</SGreyish>
      </SText>
    </SMetric>
  </SWrapper>
);

export default LessonMetrics;

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: max-content;
  margin: 0 0 10px;

  ${customMediaQuery('tablet')} {
    margin: 0 0 20px;
  }
`;

const SMetric = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const SIcon = styled.div<{ src: string; colored?: boolean }>`
  display: inline-block;
  background-image: url(${({ src }) => src});
  margin-right: 4px;
  height: 15px;
  width: 15px;
  min-width: 15px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  ${({ colored }) => (!colored ? 'fill: #5E5D71;' : '')}
`;

const SText = styled.h3`
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

const SGreyish = styled.span`
  color: #a7aab6;
`;
