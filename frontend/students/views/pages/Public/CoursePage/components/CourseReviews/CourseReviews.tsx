import React, { FC } from 'react';
import styled from 'styled-components';
import { ICourseDetailsReview } from 'students/models';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';

import ReviewCard from './ReviewCard';

interface ICourseReviews {
  reviews: ICourseDetailsReview[];
}

const CourseReviews: FC<ICourseReviews> = ({ reviews }) => (
  <SWrapper>
    <SHeader>
      <STitle>
        <Translate str="frontend.course.reviews" />
      </STitle>
    </SHeader>

    <SReviewsWrapper>
      {reviews.map((review: ICourseDetailsReview) => (
        <ReviewCard review={review} key={review.id} />
      ))}
    </SReviewsWrapper>
  </SWrapper>
);

export default CourseReviews;

const SWrapper = styled.div`
  margin: 0 0 60px;

  ${customMediaQuery('tablet')} {
    margin: 0 0 70px;
  }
`;

const SHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  ${customMediaQuery('tablet')} {
    margin-bottom: 20px;
  }
`;

const STitle = styled.h2`
  display: none;
  font-size: 1.375rem;
  font-weight: 800;
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  line-height: 2.25rem;
  color: #2d2d3a;
  margin: 0;
  padding: 0;

  ${customMediaQuery('tablet')} {
    display: block;
  }
`;

const SReviewsWrapper = styled.div`
  height: auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, 1fr);

  ${customMediaQuery('tablet')} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
