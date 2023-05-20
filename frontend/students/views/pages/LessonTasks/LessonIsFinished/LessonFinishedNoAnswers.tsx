import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Translate } from 'i18n';
import characterQuestion from 'students/views/shared/assets/character_question.png';
import characterQuestionWebp from 'students/views/shared/assets/character_question.webp';
import { getLessonPathFromUrl } from 'students/stores/_utils/helpers';
import { customMediaQuery } from 'students/views/shared/styled';
import { SCardBody, SMessage } from './LessonIsFinished';

const LessonFinishedNoAnswers: React.FC = () => {
  const { pathname } = useLocation();
  const lessonPath = getLessonPathFromUrl(pathname);
  return (
    <STransparentCard>
      <SCardBodyWithMargin>
        <picture>
          <source srcSet={characterQuestionWebp} type="image/webp" />
          <Image src={characterQuestion} />
        </picture>
        <SNoResultsMessage>
          <Translate str="frontend.lesson_task.finished.no_results" />
        </SNoResultsMessage>
        <SMessageText>
          <Translate str="frontend.lesson_task.finished.no_results_text" />
        </SMessageText>
        <SBtnLikeLink to={lessonPath} replace>
          <SFaIcon icon={faAngleLeft} size="lg" />
          <Translate str="frontend.lesson_task.finished.back_to_learn" />
        </SBtnLikeLink>
      </SCardBodyWithMargin>
    </STransparentCard>
  );
};

export default LessonFinishedNoAnswers;

const SCard = styled.div`
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  max-width: 100%;
`;

const STransparentCard = styled(SCard)`
  background-color: transparent;
  text-align: center;
`;

const SNoResultsMessage = styled(SMessage)`
  color: #fff;
  margin-top: 2.25rem;
  margin-bottom: 0.75rem;
  text-align: center;
`;

const SMessageText = styled.p`
  color: #fbfcff;
  opacity: 0.8;
  font-size: 1rem;
  line-height: 1.375rem;
  margin-bottom: 4.875rem;
`;

export const SBtnLikeLink = styled(Link)`
  min-width: 100%;
  background: #fbfcff;
  box-shadow: 0px 4px 10px rgba(13, 97, 120, 0.2);
  border-radius: 62px;
  font-size: 1rem;
  line-height: 1.625rem;
  color: #2d2d3a;
  padding: 0.875rem 1.625rem;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    text-decoration: none;
    color: #2d2d3a;
  }

  ${customMediaQuery('tablet')} {
    min-width: 23rem;
  }
`;

const SFaIcon = styled(FontAwesomeIcon)`
  margin-right: 0.725rem;
`;

const SCardBodyWithMargin = styled(SCardBody)`
  margin: 1rem auto;
`;
