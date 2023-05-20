import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import format from 'date-fns/format';
import { ILessonAuthor } from 'students/models';
import { customMediaQuery } from 'students/views/shared/styled';
import Picture from 'students/views/shared/components/Picture';

import starIcon from '../../../assets/star_icon.svg';
import starInactiveIcon from '../../../assets/star_inactive_icon.svg';

interface IReviewAuthor {
  author: ILessonAuthor;
  rating: number;
  date: string;
  className?: string;
}

const ReviewAuthor: FC<IReviewAuthor> = ({ author, rating, date, className }) => (
  <SWrapper className={cn(className)}>
    <SAuthorAvatar>
      <Picture lazy src={author.avatarURL} alt={author.name} />
    </SAuthorAvatar>

    <SAuthorInformation>
      <SAuthorName>{author.name}</SAuthorName>

      <SDate>{format(new Date(date), 'd MMMM yyyy')}</SDate>
    </SAuthorInformation>

    <SRating>
      {[1, 2, 3, 4, 5].map((i) => (
        <SStar key={i} src={i <= rating ? starIcon : starInactiveIcon} />
      ))}
    </SRating>
  </SWrapper>
);

export default ReviewAuthor;

const SWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const SAuthorAvatar = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: 8px;
  overflow: hidden;

  ${customMediaQuery('tablet')} {
    height: 48px;
    width: 48px;
    margin-right: 16px;
  }
`;

const SAuthorInformation = styled.div`
  margin-right: 12px;
`;

const SAuthorName = styled.h3`
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.25rem;
  color: #2d2d3a;
  margin: 0 0 2px;
  padding: 0;

  ${customMediaQuery('tablet')} {
    margin: 0 0 4px;
  }
`;

const SDate = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1rem;
  color: #a7aab6;
  margin: 0;
  padding: 0;
`;

const SRating = styled.div`
  display: flex;
  justify-content: space-between;
  width: max-content;
`;

const SStar = styled.div<{ src: string }>`
  display: inline-block;
  background-image: url(${({ src }) => src});
  margin-right: 2px;
  height: 14px;
  width: 14px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  ${customMediaQuery('tablet')} {
    height: 18px;
    width: 18px;
  }
`;
