import React, { FC } from 'react';
import styled from 'styled-components';
import { Translate } from 'i18n';
import { customMediaQuery } from 'students/views/shared/styled';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import { SAudioPlayer } from './StatementItem';
import LampIcon from './lamp_icon.svg';

interface IDemoStatementItem {
  question: {
    question: string;
    column1Question: string;
    column2Question?: string;
    questionAudio?: string;
  };
  columnTitles: Record<string, any>;
}

const DemoStatementItem: FC<IDemoStatementItem> = ({ question, columnTitles }) => (
  <SWrapper>
    <SItemHeader>
      <UrlIcon url={LampIcon} color="#ffffff" height="24px" width="24px" />

      <Translate str="frontend.lesson_task.tasks.check.fill_in_table.example" />
    </SItemHeader>

    <SItemContent>
      <SQuestionWrapper>
        <SColumnTitle>{columnTitles.h1}</SColumnTitle>

        {question.questionAudio ? (
          <SAudioPlayer src={question.questionAudio} size="sm" withDurationFix />
        ) : (
          <SQuestion>{question.question}</SQuestion>
        )}
      </SQuestionWrapper>

      <SInputWrapper $colSpan={question.column2Question ? 1 : 2}>
        <SColumnTitle>{columnTitles.h2}</SColumnTitle>

        <SInput disabled value={question.column1Question} />
      </SInputWrapper>

      {question.column2Question && (
        <SInputWrapper $colSpan={1}>
          <SColumnTitle>{columnTitles.h3}</SColumnTitle>

          <SInput disabled value={question.column2Question} />
        </SInputWrapper>
      )}
    </SItemContent>
  </SWrapper>
);

export default DemoStatementItem;

const SWrapper = styled.div`
  border-radius: 8px;
  background: #deddef;
  margin-bottom: 8px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;

  ${customMediaQuery('tablet')} {
    border-radius: 12px;
    margin-bottom: 4px;
  }
`;

const SItemHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ffffff;
  font-size: 0.6875rem;
  font-weight: 700;
  background: #cecde8;
  text-transform: uppercase;
  padding: 8px 14px;
  width: 100%;

  & > div {
    margin-right: 8px;
  }

  ${customMediaQuery('tablet')} {
    display: none;
  }
`;

const SQuestion = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5rem;
  color: #2d2d3a;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  padding: 6px 12px;
  margin: 0;
  width: 100%;

  ${customMediaQuery('tablet')} {
    background: none;
    padding: 0;
    color: #5e5d71;
    align-self: center;
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

const SQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const SColumnTitle = styled.h2`
  border-right: 1px solid #ffffff;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: inherit;
  margin: 0 16px 0 0;
  padding: 0 16px 0 0;
  text-transform: uppercase;
  color: #2d2d3a;
  word-break: break-all;
  min-width: 80px;
  max-width: 80px;
  height: 100%;
  display: flex;
  align-items: center;

  ${customMediaQuery('tablet')} {
    display: none;
  }
`;

const SItemContent = styled.div`
  display: grid;
  grid-gap: 0;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  padding: 14px;

  ${customMediaQuery('tablet')} {
    grid-template-rows: unset;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
`;

const SInputWrapper = styled.div<{ $colSpan: number }>`
  grid-column-end: span ${({ $colSpan }) => $colSpan};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1px;

  ${customMediaQuery('tablet')} {
    border-left: 1px solid #ffffff;
    padding-left: 1rem;
  }
`;

const SInput = styled.input`
  height: 36px;
  padding: 0 12px;
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5rem;
  color: #2d2d3a;
  cursor: default;
  box-shadow: inset 0 2px 0 #e4e4f4;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  width: 100%;

  &:hover,
  &:focus,
  &:active {
    outline: none;
  }

  ${customMediaQuery('tablet')} {
    height: 50px;
    padding: 0 20px;
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #5e5d71;
  }
`;
