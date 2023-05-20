import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { IAssignmentReviewerTeam } from 'students/models';
import { customMediaQuery } from 'students/views/shared/styled';

import AssignmentMetrics from './AssignmentMetrics';
import Picture from 'students/views/shared/components/Picture';

interface IAuthorBio {
  reviewer: IAssignmentReviewerTeam;
  className?: string;
}

const ReviewerBio: FC<IAuthorBio> = ({ reviewer, className }) => (
  <SWrapper className={cn(className)}>
    <SAvatar>
      <Picture src={reviewer.imageURL} alt={reviewer.name} />
    </SAvatar>

    <SAuthorName>{reviewer.name}</SAuthorName>

    <AssignmentMetrics
      lessonsCount={reviewer.lessonsCount}
      followersCount={reviewer.followersCount}
      rating={0}
    />
  </SWrapper>
);

export default ReviewerBio;

const SWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const SAvatar = styled.div`
  border-radius: 50%;
  height: 70px;
  width: 70px;
  background-color: #9898a0;
  margin: 0 0 4px;
  overflow: hidden;

  ${customMediaQuery('tablet')} {
    height: 88px;
    width: 88px;
  }
`;

const SAuthorName = styled.h3`
  color: #2d2d3a;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem;
  margin: 0 0 4px;

  ${customMediaQuery('tablet')} {
    font-size: 1.25rem;
  }
`;
