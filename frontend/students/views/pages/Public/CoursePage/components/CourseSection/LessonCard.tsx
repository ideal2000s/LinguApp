import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import cn from 'classnames';
import { ICourseDetailsLesson } from 'students/models';
import { customMediaQuery } from 'students/views/shared/styled';
import ArrowIcon from 'students/views/shared/assets/icons/arrow_collapse.svg';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import Picture from 'students/views/shared/components/Picture';

import LessonMetrics from './LessonMetrics';
import Author from '../../../components/Author';

interface ILessonCard {
  lesson: ICourseDetailsLesson;
  className?: string;
}

const LessonCard: FC<ILessonCard> = ({ lesson, className }) => {
  return (
    <SLink to={`/lessons/${lesson.id}`}>
      <SWrapper className={cn(className)}>
        <SLessonImage>
          <Picture lazy src={lesson.imageURL} alt={lesson.title} />
        </SLessonImage>

        <SLessonInformation>
          <LessonMetrics
            duration={lesson.averageDuration || 0}
            phrasesCount={lesson.phrasesCount}
            totalRating={lesson.totalRating}
            ratingsCount={lesson.ratingsCount}
          />

          <STitle>{lesson.title}</STitle>

          <Author
            author={{
              name: lesson.author.name || '',
              avatarURL: lesson.author.avatarURL || ''
            }}
          />
        </SLessonInformation>

        <SHoverArrow className="hover-arrow">
          <UrlIcon url={ArrowIcon} height="12px" width="12px" color="#a7aab6" />
        </SHoverArrow>
      </SWrapper>
    </SLink>
  );
};

export default LessonCard;

const SLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;

  &:hover {
    color: inherit;
    text-decoration: inherit;
  }

  &:visited {
    color: inherit;
    text-decoration: inherit;
  }
`;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #ffffff;
  border: 1px solid #ebebeb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border-radius: 18px;
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out;
  position: relative;

  & > .hover-arrow {
    display: none;
  }

  ${customMediaQuery('tablet')} {
    align-items: center;
    flex-direction: row;
    margin-bottom: 16px;
    padding: 12px;

    & > .hover-arrow {
      display: flex;
    }

    &:hover {
      transform: translate3d(0, -8px, 0);
      box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.05);

      & > .hover-arrow {
        opacity: 1;
      }
    }
  }
`;

const SHoverArrow = styled.div`
  background-color: #f0f0f3;
  border-radius: 7px;
  width: 30px;
  height: calc(100% - 24px);
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;
  transition: opacity 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    transform: rotate(90deg);
  }
`;

const SLessonImage = styled.div`
  border-radius: 10px;
  background-color: #e6e6f0;
  height: 154px;
  width: 100%;
  margin-bottom: 16px;
  overflow: hidden;

  ${customMediaQuery('tablet')} {
    height: 132px;
    width: 180px;
    margin-right: 32px;
    margin-bottom: 0;
    border-radius: 14px;
  }
`;

const SLessonInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const STitle = styled.h2`
  font-size: 0.9375rem;
  font-weight: 800;
  line-height: 1.2rem;
  color: #2d2d3a;
  margin: 0 0 12px;
  padding: 0;

  ${customMediaQuery('tablet')} {
    font-size: 1.375rem;
    line-height: 1.875rem;
    margin: 0 0 24px;
  }
`;
