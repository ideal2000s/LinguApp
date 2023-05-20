import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Carousel } from 'react-bootstrap';
import { ICourseDetailsLesson } from 'students/models';

import LessonCard from './LessonCard';

interface ILessonsCarousel {
  lessons: ICourseDetailsLesson[];
  className?: string;
}

const LessonsCarousel: FC<ILessonsCarousel> = ({ lessons, className }) => (
  <SWrapper className={cn(className)}>
    <Carousel touch controls={false} interval={4000}>
      {lessons.map((lesson: ICourseDetailsLesson) => (
        <Carousel.Item key={lesson.id}>
          <LessonCard lesson={lesson} />
        </Carousel.Item>
      ))}
    </Carousel>
  </SWrapper>
);

export default LessonsCarousel;

const SWrapper = styled.div`
  .carousel {
    &-indicators {
      margin-bottom: -20px;

      li {
        width: 6px;
        height: 6px;
        background-color: #a7aab6;
        border-radius: 50%;
        opacity: 0.5;
        transition: opacity 0.6s ease;
        border: none;
        margin: 0 4px;

        &.active {
          width: 24px;
          background-color: #00a5d7;
          border-radius: 10px;
        }
      }
    }
  }
`;
