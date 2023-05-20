import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Translate } from 'i18n';
import { Spinner } from 'students/views/shared/components/Spinner';
import { fetchLessonSession, lessonSelectors } from 'students/stores/lesson';
import { customMediaQuery } from 'students/views/shared/styled';
import { useLoadCheckResults } from './helpers/loadCheckResultsHook';
import LessonFinishedResult from './LessonFinishedResult';
import { getLessonPathFromUrl } from 'students/stores/_utils/helpers';

const LessonIsFinishedView: React.FC = () => {
  const { pathname } = useLocation();
  const lessonPath = getLessonPathFromUrl(pathname);
  const { lessonId } = useParams<{ lessonId: string }>();
  const { isLoading, showSpinner, lessonSession, sessionResults } = useLoadCheckResults();
  const lesson = useSelector(lessonSelectors.selectLesson);
  const dispatch = useDispatch();

  useEffect(() => {
    if (lessonSession?.status !== 'completed') {
      dispatch(fetchLessonSession(parseInt(lessonId)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || showSpinner) {
    return <Spinner />;
  }

  return (
    <>
      <SCard>
        <SCardBody>
          <SBodyContent>
            <LessonFinishedResult
              tasks={sessionResults.tasks}
              score={sessionResults.taskItemsCorrectlyAnsweredCount}
              total={sessionResults.taskItemsPublishedCount}
            />
          </SBodyContent>
        </SCardBody>
      </SCard>
      {sessionResults.tasks.length ? (
        <SResultsLink to={`${pathname}/results`} replace className="btn" role="button">
          <SLinkText>
            <Translate str="frontend.lesson_task.finished.see_correct_answers_list" />
          </SLinkText>
        </SResultsLink>
      ) : null}
      {lesson?.course?.nextCourseLessonId ? (
        <SBtnLikeLink to={`/lessons/${lesson?.course.nextCourseLessonId}`} replace>
          <Translate str="frontend.lesson_task.finished.next_course_lesson" />
          <SFaIcon icon={faAngleRight} size="lg" ml="0.725rem" />
        </SBtnLikeLink>
      ) : (
        <SBtnLikeLink to={lessonPath} replace>
          <SFaIcon icon={faAngleLeft} size="lg" mr="0.725rem" />
          <Translate str="frontend.lesson_task.finished.back_to_lesson_page" />
        </SBtnLikeLink>
      )}
    </>
  );
};

export default LessonIsFinishedView;

const SCard = styled.div`
  background: linear-gradient(84.65deg, #ded7ea 9.45%, #ffffff 98.3%);
  box-shadow: 0px 4px 0px rgba(28, 16, 55, 0.25);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 1.25rem;
  max-width: 100%;
  position: relative;
  padding-left: 6.875rem;

  ${customMediaQuery('tablet')} {
    padding-left: 8.75rem;
  }
`;

export const SCardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SMessage = styled.h1`
  text-align: left;
  margin-top: 1rem;
  font-size: 1.375rem;
  line-height: 1.75rem;
  font-weight: bold;
  letter-spacing: -0.035em;
  margin-top: 0;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 1.875rem;
    line-height: 2.3125rem;
  }
`;

const SResultsLink = styled(Link)`
  background-color: rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  min-width: 100%;
  margin-bottom: 2.25rem;
  margin-top: 0.625rem;

  ${customMediaQuery('tablet')} {
    min-width: 470px;
  }
`;

const SLinkText = styled.span`
  color: #fff;
  opacity: 0.8;
`;

const SFaIcon = styled(FontAwesomeIcon)<{ ml?: string; mr?: string }>`
  margin-left: ${({ ml }) => (ml ? ml : 0)};
  margin-right: ${({ mr }) => (mr ? mr : 0)};
`;

const SBtnLikeLink = styled(Link)<{ mt?: string; mb?: string }>`
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
  text-align: center;
  margin-top: 1rem;

  &:hover {
    text-decoration: none;
    color: #2d2d3a;
  }

  ${customMediaQuery('tablet')} {
    min-width: 23rem;
  }
`;

const SBodyContent = styled.div`
  display: flex;
  align-items: center;
`;
