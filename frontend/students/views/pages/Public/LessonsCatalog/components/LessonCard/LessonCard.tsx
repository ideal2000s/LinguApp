import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { t } from 'i18n';
import { ILessonApiResponse } from 'students/models';
import { customMediaQuery } from 'students/views/shared/styled';
import Picture from 'students/views/shared/components/Picture';

import LessonMetrics from './LessonMetrics';
// import LessonRating from './LessonRating';
import LessonDurationMetrics from './LessonDurationMetrics';
import Author from '../../../components/Author';

interface ILessonCard {
  lesson: ILessonApiResponse['lesson'];
  className?: string;
}

const LessonCard: FC<ILessonCard> = ({ lesson, className }) => {
  const {
    author,
    averageDuration,
    id,
    imageURL,
    language,
    level,
    objectives,
    phrasesCount,
    // rating,
    supportLanguage,
    title
  } = lesson;

  return (
    <SLink to={`/lessons/${id}`}>
      <SWrapper className={cn(className)}>
        <SLessonImage>
          <Picture lazy src={imageURL} alt={title} />
          {/* <SLessonRatingMobile rating={rating} /> */}
        </SLessonImage>

        <SLessonInformation>
          <SLessonMetrics
            duration={averageDuration || 0}
            phrasesCount={phrasesCount}
            language={language}
            supportLanguage={supportLanguage && supportLanguage.name}
            level={level}
          />

          <STitle>{title}</STitle>

          <SDescriptionWrapper>
            {objectives.length ? (
              objectives.map((objective, index) => (
                <SDescription key={index}>{objective}</SDescription>
              ))
            ) : (
              <SDescription>{t('frontend.course.no_description')}</SDescription>
            )}
          </SDescriptionWrapper>

          <SCardFooter>
            {author && <Author author={author} />}
            <SShowOnMobileBlock>
              <LessonDurationMetrics
                duration={averageDuration || 0}
                phrasesCount={phrasesCount}
              />
            </SShowOnMobileBlock>
            {/* <SLessonRatingDesktop rating={rating} /> */}
          </SCardFooter>
        </SLessonInformation>
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
  margin-bottom: 12px;
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out;
  position: relative;

  ${customMediaQuery('tablet')} {
    align-items: stretch;
    flex-direction: row;
    margin-bottom: 24px;
    padding: 20px;
  }

  ${customMediaQuery('desktop')} {
    &:hover {
      transform: perspective(200px) translate3d(0, -4px, 0);
      box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.05);
    }
  }
`;

const SLessonImage = styled.div`
  border-radius: 0.375rem;
  background-color: #e6e6f0;
  height: 154px;
  width: 100%;
  margin-bottom: 12px;
  overflow: hidden;
  position: relative;

  ${customMediaQuery('tablet')} {
    min-height: 10.25rem;
    max-height: 10.25rem;
    min-width: 12.75rem;
    max-width: 12.75rem;
    margin-right: 0.875rem;
    border-radius: 0.625rem;
    margin-bottom: 0;
  }

  ${customMediaQuery('desktop')} {
    min-height: 196px;
    max-height: 196px;
    min-width: 254px;
    max-width: 254px;
    margin-right: 20px;
  }
`;

const SLessonInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const SLessonMetrics = styled(LessonMetrics)`
  margin: 0 0 12px;

  ${customMediaQuery('tablet')} {
    margin: 0 0 16px;
  }
`;

const STitle = styled.h2`
  font-size: 0.9375rem;
  font-weight: 800;
  line-height: 1.2rem;
  color: #2d2d3a;
  margin: 0 0 12px;
  padding: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${customMediaQuery('tablet')} {
    font-size: 1.375rem;
    line-height: 1.875rem;
    margin: 0 0 6px;
  }
`;

const SDescriptionWrapper = styled.div`
  margin: 0 0 20px;
`;

const SDescription = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: rgba(45, 45, 58, 0.8);
  margin: 0 0 10px;
  padding: 0;
  display: none;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${customMediaQuery('desktop')} {
    display: -webkit-box;
  }
`;

const SShowOnMobileBlock = styled.div`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  flex-wrap: wrap;
  display: flex;

  ${customMediaQuery('desktop')} {
    display: none;
  }
`;

const SCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Uncomment when we will have rating
// const SLessonRatingMobile = styled(LessonRating)`
//   position: absolute;
//   right: 0;

//   ${customMediaQuery('desktop')} {
//     display: none;
//   }
// `;

// const SLessonRatingDesktop = styled(LessonRating)`
//   display: none;
//   background-color: transparent;
//   color: #5e5d71;
//   font-size: 0.875rem;
//   padding: 0;
//   align-items: center;

//   ${customMediaQuery('desktop')} {
//     display: flex;
//   }
// `;
