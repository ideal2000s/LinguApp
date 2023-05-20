import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Translate } from 'i18n';
import { ICatalogCourse } from 'students/models';
import { customMediaQuery } from 'students/views/shared/styled';
import Picture from 'students/views/shared/components/Picture';

import CourseMetrics from './CourseMetrics';
import { STYLES_COLOR_MAP } from './constants';

interface ICourseCard {
  course: ICatalogCourse;
  className?: string;
}

const CourseCard: FC<ICourseCard> = ({ course, className }) => {
  const {
    color,
    estimatedTime,
    lessonsCount,
    wordCount,
    language,
    level,
    title,
    description,
    slug,
    imageURL
  } = course;

  const courseStyles =
    (color &&
      STYLES_COLOR_MAP.find(
        (styles: typeof STYLES_COLOR_MAP[number]) => styles.color === color
      )) ||
    STYLES_COLOR_MAP[Math.floor(Math.random() * 4)];

  return (
    <SWrapper className={cn(className)} $gradient={courseStyles.gradient}>
      <SCourseImageWrapper $styles={courseStyles}>
        <SCourseImage>
          <Picture lazy src={imageURL} alt={title} />
        </SCourseImage>
      </SCourseImageWrapper>

      <SCourseInformation>
        <CourseMetrics
          duration={estimatedTime}
          lessonsCount={lessonsCount || 0}
          wordCount={wordCount}
          language={language}
          level={level}
        />

        <STitle title={title}>{title}</STitle>

        <SDescription>{description}</SDescription>

        <STryLink to={`/courses/${slug}`}>
          <Translate str="frontend.course.try_this_course" />
        </STryLink>
      </SCourseInformation>
    </SWrapper>
  );
};

export default CourseCard;

const SWrapper = styled.div<{ $gradient: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: ${({ $gradient }) => $gradient};
  border-radius: 1.125rem;
  margin-bottom: 0.75rem;
  overflow: hidden;
  min-height: 35.25rem;
  position: relative;

  ${customMediaQuery('tablet')} {
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 1.5rem;
    min-height: 22.25rem;
  }
`;

const SCourseImageWrapper = styled.div<{ $styles: typeof STYLES_COLOR_MAP[number] }>`
  background-image: url(${({ $styles }) => $styles.mobile.background});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 16.25rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  & > div {
    transform: ${({ $styles }) => $styles.mobile.transform};
  }

  @media (min-width: 420px) {
    background-position: 0 75%;

    & > div {
      transform: ${({ $styles }) => $styles.tablet.transform};
      width: 100%;
    }
  }

  ${customMediaQuery('tablet')} {
    background-image: url(${({ $styles }) => $styles.desktop.background});
    background-size: contain;
    background-position: center;
    width: ${({ $styles }) => $styles.desktop.width};
    height: 22.25rem;
    ${({ $styles }) => $styles.tablet.position}

    & > div {
      transform: ${({ $styles }) => $styles.desktop.transform};
      width: ${({ $styles }) => $styles.desktop.imageWidth};
      height: ${({ $styles }) => $styles.desktop.imageHeight};
    }
  }

  @media (min-width: 880px) {
    ${({ $styles }) => $styles.desktop.position}
  }
`;

const SCourseImage = styled.div`
  border-radius: 1.125rem;
  background-color: linear-gradient(323.99deg, #ebf2f9 -7.17%, #f8fafd 99.25%);
  height: 15.5rem;
  width: 16.25rem;
  overflow: hidden;

  ${customMediaQuery('tablet')} {
    height: 289px;
    width: 345px;
  }
`;

const SCourseInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0 1rem 1.125rem;
  box-sizing: border-box;
  z-index: 1;

  ${customMediaQuery('tablet')} {
    max-width: 58%;
    padding: 2rem 0 2rem 1.5rem;
  }

  ${customMediaQuery('desktop')} {
    padding: 2.375rem 0 2.375rem 2.5rem;
  }
`;

const STitle = styled.h2`
  font-size: 1.375rem;
  font-weight: 800;
  line-height: 2.25rem;
  color: #ffffff;
  margin: 0;
  padding: 0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${customMediaQuery('tablet')} {
    font-size: 1.75rem;
    margin: 0 0 0.375rem;
    text-align: left;
  }
`;

const SDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: rgba(255, 255, 255, 0.86);
  margin: 0 0 1.875rem;
  padding: 0;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: center;

  ${customMediaQuery('tablet')} {
    text-align: left;
  }
`;

const STryLink = styled(Link)`
  background: #2d2d3a;
  border-radius: 0.625rem;
  border: 1px solid transparent;
  color: #ffffff;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 2.25rem;
  padding: 0.625rem;
  width: 100%;
  margin-bottom: 1.375rem;
  display: inline-block;
  text-align: center;
  align-self: center;

  &:hover {
    color: #ffffff;
    text-decoration: none;
  }

  ${customMediaQuery('tablet')} {
    width: max-content;
    min-width: 15.125rem;
    padding: 0.875rem 2.25rem;
    margin-bottom: 0;
    align-self: flex-start;
  }
`;
