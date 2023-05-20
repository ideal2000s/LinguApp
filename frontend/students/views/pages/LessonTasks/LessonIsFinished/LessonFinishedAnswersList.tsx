import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import ArrowIcon from 'students/views/shared/assets/icons/back_arrow_icon.svg';
import {
  IFillInBlanksResultsItem,
  IFillInTableResultItem,
  IInlineDropdownResultsItem,
  IMultipleChoiceResultsItem,
  ITrueFalseResultsItem
} from 'students/models/lessonTasks/results';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { getLessonPathFromUrl } from 'students/views/shared/helpers';
import { Spinner } from 'students/views/shared/components/Spinner';
import {
  SBaseCheckTaskBody,
  SCheckTaskWrapper,
  SItemTitle,
  SPaddedContent
} from '../TaskSubjects/Check/components';
import AnswerOptionItem from '../TaskSubjects/Check/Tasks/MultipleChoiceTask/AnswerOptionItem';
import AnswerSentenceItem from '../TaskSubjects/Check/Tasks/FillInBlanksTask/AnswerSentenceItem';
import AnswerStatementItem from '../TaskSubjects/Check/Tasks/FillInTableTask/AnswerStatementItem';
import AnswerTrueFalseItem from '../TaskSubjects/Check/Tasks/TrueFalseTask/AnswerStatementItem';
import LessonFinishedNoAnswers from './LessonFinishedNoAnswers';
import { useLoadCheckResults } from './helpers/loadCheckResultsHook';

const LessonFinishedAnswersList: React.FC = () => {
  const { pathname } = useLocation();
  const lessonPath = getLessonPathFromUrl(pathname);
  const { isLoading, showSpinner, sessionResults } = useLoadCheckResults();

  const renderByTaskType = useCallback((task) => {
    const { type, items } = task;
    switch (type) {
      case 'Tasks::SelectText':
        return (
          <React.Fragment key={task.id}>
            {items.map((item: IMultipleChoiceResultsItem, idx: number) => (
              <SQuestionWrap key={`${idx} ${task.id}`}>
                <SItemTitle>{item.question}</SItemTitle>
                {item.options.map((option) => (
                  <AnswerOptionItem
                    itemSession={item.itemSession.options}
                    option={option}
                    key={option.id}
                  />
                ))}
              </SQuestionWrap>
            ))}
          </React.Fragment>
        );

      case 'Tasks::InlineDropdown':
        return (
          <SQuestionWrap key={task.id}>
            <SItemTitle>{task.title}</SItemTitle>
            {items.map((item: IInlineDropdownResultsItem, idx: number) => (
              <AnswerSentenceItem
                key={`${idx} ${task.id}`}
                answer={item.itemSession.answer}
                solution={item.solution.map((item) => [item])}
                sentence={item.statement}
              />
            ))}
          </SQuestionWrap>
        );

      case 'Tasks::FillInBlanks':
        return (
          <SQuestionWrap key={task.id}>
            <SItemTitle>{task.title}</SItemTitle>
            {items.map((item: IFillInBlanksResultsItem, idx: number) => {
              return (
                <AnswerSentenceItem
                  key={`${idx} ${task.id}`}
                  answer={item.itemSession.answer}
                  solution={item.solution}
                  sentence={item.question}
                />
              );
            })}
          </SQuestionWrap>
        );

      case 'Tasks::FillInTable':
        return (
          <SQuestionWrap key={task.id}>
            <SItemTitle>{task.title}</SItemTitle>
            {items.map((item: IFillInTableResultItem, idx: number) => (
              <AnswerStatementItem
                key={`${idx} ${task.id}`}
                options={item.options}
                columns={task.columns}
                answers={item.itemSession.answer}
                question={item.question}
                columnTitles={{
                  h1: task.h1,
                  h2: task.h2,
                  h3: task.h3
                }}
                audioUrl={item.audioURL}
              />
            ))}
          </SQuestionWrap>
        );

      case 'Tasks::TrueFalse':
        return (
          <SQuestionWrap key={task.id}>
            <SItemTitle>{task.title}</SItemTitle>
            {items.map((item: ITrueFalseResultsItem, idx: number) => (
              <AnswerTrueFalseItem
                key={`${idx} ${task.id}`}
                question={item.statement}
                solution={item.correct}
                answer={item.itemSession.answer}
              />
            ))}
          </SQuestionWrap>
        );

      default:
        return null;
    }
  }, []);

  if (isLoading || showSpinner) {
    return <Spinner />;
  }

  if (!sessionResults.tasks.length) {
    return <LessonFinishedNoAnswers />;
  }

  return (
    <SCheckTaskWrapper>
      <SBackLink to={`${lessonPath}/tasks/finished`} replace>
        <UrlIcon height="1.2rem" width="1.2rem" url={ArrowIcon} color="#fbfcff" />
        <Translate str="frontend.lesson_task.finished.back_to_results_page" />
      </SBackLink>
      <SBaseCheckTaskBody>
        <SPaddedContent>
          <SHeading>
            <Translate str="frontend.lesson_task.finished.correct_answers_list" />
          </SHeading>
          {sessionResults.tasks.map((task) => renderByTaskType(task))}
        </SPaddedContent>
      </SBaseCheckTaskBody>
      <SCloseButton to={lessonPath} role="button" replace>
        <Translate str="frontend.lesson_task.finished.close_lesson" />
      </SCloseButton>
    </SCheckTaskWrapper>
  );
};

const SHeading = styled.h2`
  font-size: 0.875rem;
  line-height: 1.29em;
  margin-bottom: 1rem;

  ${customMediaQuery('tablet')} {
    font-size: 1.125rem;
    line-height: 1.33em;
    margin-bottom: 1.875rem;
  }
`;

const SCloseButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.625rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  min-height: 3rem;
  margin-top: 1.5rem;
  color: #fff;
  text-decoration: none;

  ${customMediaQuery('tablet')} {
    min-width: 17.813rem;
  }

  ${styleInnerButton()} {
    padding: 0.875rem 2rem;
  }

  &:hover {
    text-decoration: none;
    color: #fff;
  }
`;

const SBackLink = styled(Link)`
  display: flex;
  align-self: flex-start;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #fbfcff;
  background: transparent;
  opacity: 0.6;
  margin-bottom: 0.75rem;

  &:hover {
    opacity: 1;
    text-decoration: none;
    color: #fbfcff;
  }

  ${customMediaQuery('tablet')} {
    margin-bottom: 1.75rem;
  }

  div:not(.inner) {
    margin-right: 1.125rem;
  }
`;

const SQuestionWrap = styled.div`
  margin-bottom: 2.75rem;

  ${customMediaQuery('tablet')} {
    margin-bottom: 3.5rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default LessonFinishedAnswersList;
