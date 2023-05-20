import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';

import starIcon from '../../../assets/star_icon.svg';

interface IRating {
  rating: number;
  reviewsCount: number;
  className?: string;
}

const Rating: FC<IRating> = ({ rating, reviewsCount, className }) => (
  <SWrapper className={cn(className)}>
    <SStar src={starIcon} />

    <SRating>{rating}</SRating>

    <SDivider />

    <SReviews>
      {reviewsCount} <Translate str="frontend.course.reviews" />
    </SReviews>
  </SWrapper>
);

export default Rating;

const SWrapper = styled.div`
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: max-content;
`;

const SStar = styled.div<{ src: string }>`
  display: inline-block;
  background-image: url(${({ src }) => src});
  margin-right: 4px;
  height: 16px;
  width: 16px;
  min-width: 16px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const SRating = styled.h6`
  font-size: 0.875rem;
  font-weight: 400;
  color: #2d2d3a;
  margin: 0;
  padding: 0;
`;

const SDivider = styled.div`
  display: inline-block;
  width: 1px;
  height: 18px;
  background: #2d2d3a;
  opacity: 0.2;
  margin: 0 8px;
`;

const SReviews = styled.h6`
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(45, 45, 58, 0.5);
  margin: 0;
  padding: 0;
  text-transform: lowercase;
`;
