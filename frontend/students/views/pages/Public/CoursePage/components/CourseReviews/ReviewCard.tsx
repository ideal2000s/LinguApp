import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { ICourseDetailsReview } from 'students/models';
import { customMediaQuery } from 'students/views/shared/styled';

import ReviewAuthor from './ReviewAuthor';

interface IReviewCard {
  review: ICourseDetailsReview;
  className?: string;
}

const ReviewCard: FC<IReviewCard> = ({ review, className }) => (
  <SWrapper className={cn(className)}>
    <ReviewAuthor author={review.author} rating={review.rating} date={review.createdAt} />

    <SText>{review.text}</SText>
  </SWrapper>
);

export default ReviewCard;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 14px;
  padding: 16px;

  ${customMediaQuery('tablet')} {
    margin-bottom: 16px;
    padding: 24px;
  }
`;

const SText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: #2d2d3a;
  margin: 12px 0 0;
  padding: 0;
`;
