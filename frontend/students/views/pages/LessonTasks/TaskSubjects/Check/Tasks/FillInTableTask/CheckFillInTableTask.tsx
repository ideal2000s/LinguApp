import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { t } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import {
  IFillInTableItem,
  IFillInTableTask,
  IFillInTableTaskSession,
  tFillInTableAnswer
} from 'students/models';

import DemoStatementItem from './DemoStatementItem';
import StatementItem, { ISelectAnswerPayload } from './StatementItem';
import { ICheckTaskProps } from '..';
import { BaseCheckTaskBody, CheckNavFooter, SCheckTaskWrapper } from '../../components';

const CheckFillInTableTask: FC<
  ICheckTaskProps<IFillInTableTask, IFillInTableTaskSession>
> = ({ task, taskSession, isCompleting, onNext, onSkip }) => {
  const { items } = task;

  const [answers, setAnswers] = useState<tFillInTableAnswer>([]);

  const columnTitles = useMemo(
    () => ({
      h1:
        task.h1 ||
        t('frontend.lesson_task.tasks.check.fill_in_table.column_question_placeholder'),
      h2:
        task.h2 ||
        `${t(
          'frontend.lesson_task.tasks.check.fill_in_table.column_answer_placeholder'
        )} 1`,
      h3:
        task.h3 ||
        `${t(
          'frontend.lesson_task.tasks.check.fill_in_table.column_answer_placeholder'
        )} 2`
    }),
    [task]
  );

  const demoQuestion = useMemo(
    () =>
      task.hasDemo
        ? {
            question: task.questionDemo || '',
            column1Question: task.column1Demo || '',
            column2Question: task.column2Demo || '',
            ...(task.audioQuestionDemo && { questionAudio: task.audioQuestionDemo })
          }
        : null,
    [task]
  );

  useEffect(() => {
    if (taskSession?.taskItemSessions.length) {
      setAnswers(taskSession.taskItemSessions);
    } else {
      setAnswers(
        items.map((item, index) => ({
          completed: false,
          id: index,
          taskItemId: item.id,
          answers: Array.from({ length: task.columns }).map(() => ''),
          attemptsCount: 0
        }))
      );
    }
  }, [taskSession, task, items]);

  const handleSelectAnswer = (payload: ISelectAnswerPayload) => {
    const { answers: userAnswers, itemId } = payload;

    const answerIndex = answers.findIndex((answer) => answer.taskItemId === itemId);
    if (answerIndex < 0) return;

    const answer = answers[answerIndex];

    setAnswers([
      ...answers.slice(0, answerIndex),
      {
        ...answer,
        answers: userAnswers
      },
      ...answers.slice(answerIndex + 1)
    ]);
  };

  const handleNext = () => {
    onNext(answers);
  };

  const handleSkip = () => {
    onSkip();
  };

  if (!answers.length) return null;

  return (
    <>
      <SCheckTaskWrapper>
        <BaseCheckTaskBody task={task}>
          <SColumnTitles>
            {Object.values(columnTitles)
              .slice(0, task.columns + 1)
              .map((title: string) => (
                <SColumnTitle key={title}>{title}</SColumnTitle>
              ))}
          </SColumnTitles>

          {demoQuestion && (
            <DemoStatementItem question={demoQuestion} columnTitles={columnTitles} />
          )}

          {items.map((item: IFillInTableItem, itemIndex) => (
            <StatementItem
              key={item.id}
              item={{
                id: item.id,
                question: item.question,
                audioURL: item.audioURL
              }}
              columnTitles={columnTitles}
              columnsNumber={task.columns}
              value={answers[itemIndex]?.answers}
              onSelectAnswer={handleSelectAnswer}
            />
          ))}
        </BaseCheckTaskBody>
      </SCheckTaskWrapper>

      <CheckNavFooter
        isCompleting={isCompleting}
        onNext={handleNext}
        onSkip={handleSkip}
      />
    </>
  );
};

export default CheckFillInTableTask;

const SColumnTitles = styled.div`
  display: none;

  ${customMediaQuery('tablet')} {
    display: grid;
    grid-template-rows: unset;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    margin-bottom: 12px;
  }
`;

const SColumnTitle = styled.h2`
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1rem;
  color: #5e5d71;
  margin: 0 0 0 22px;
  padding: 0;
  text-transform: uppercase;

  &:first-child {
    margin: 0;
  }
`;
