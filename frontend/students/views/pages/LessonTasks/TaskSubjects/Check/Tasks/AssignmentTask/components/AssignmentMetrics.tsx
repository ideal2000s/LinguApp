import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { customMediaQuery } from 'students/views/shared/styled';

import bookIcon from '../assets/book_icon.svg';
import followersIcon from '../assets/followers_icon.svg';
import _starIcon from '../assets/star_icon.svg';

interface IAssignmentMetrics {
  lessonsCount: number;
  followersCount: number;
  rating: number;
  className?: string;
}

const AssignmentMetrics: FC<IAssignmentMetrics> = ({
  lessonsCount,
  followersCount,
  rating: _rating,
  className
}) => (
  <SWrapper className={cn(className)}>
    <SMetric>
      <UrlIcon url={bookIcon} height="18px" width="18px" color="#5E5D71" />

      <SText>
        <Translate
          str="frontend.lesson_task.tasks.check.assignment.lessons_count"
          params={{ lessonsCount }}
        />
      </SText>
    </SMetric>

    <SMetric>
      <UrlIcon url={followersIcon} height="18px" width="18px" color="#5E5D71" />

      <SText>
        <Translate
          str="frontend.lesson_task.tasks.check.assignment.followers_count"
          params={{ followersCount }}
        />
      </SText>
    </SMetric>

    {/*<SMetric>*/}
    {/*  <UrlIcon url={starIcon} height="18px" width="18px" color="#5E5D71" />*/}

    {/*  <SText>{rating}</SText>*/}
    {/*</SMetric>*/}
  </SWrapper>
);

export default AssignmentMetrics;

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SMetric = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;

  & > div {
    margin-right: 2px;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const SText = styled.h3`
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: #5e5d71;
  margin: 0;
  padding: 0;
  text-transform: lowercase;

  ${customMediaQuery('tablet')} {
    font-size: 0.875rem;
  }
`;
