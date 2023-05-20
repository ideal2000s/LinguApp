import React, { useCallback } from 'react';
import styled from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';
import {
  SWrapper,
  SItemContent,
  SQuestionWrapper,
  SColumnTitle,
  SQuestion,
  SInputWrapper,
  SAudioPlayer
} from './StatementItem';

interface IProps {
  answers: string[];
  columns: number;
  question: string;
  columnTitles: Record<string, any>;
  options: { id: number; answers: string[] }[];
  audioUrl: string | null;
}

const AnswerStatementItem: React.FC<IProps> = ({
  answers,
  columns,
  question,
  columnTitles,
  options,
  audioUrl
}) => {
  const findMatching = useCallback(
    (answer: string, idx: number) => {
      if (options.length > 1) {
        return options[idx].answers.find(
          (solutionEl) => solutionEl.toLowerCase() === answer.toLowerCase()
        );
      }
      return options[0].answers.find(
        (solutionEl) => solutionEl.toLowerCase() === answer.toLowerCase()
      );
    },
    [options]
  );

  return (
    <SWrapper>
      <SItemContent>
        <SQuestionWrapper>
          <SColumnTitle>{columnTitles.h1}</SColumnTitle>

          {audioUrl ? (
            <SAudioPlayer src={audioUrl} size="sm" withDurationFix />
          ) : (
            <SQuestion>{question}</SQuestion>
          )}
        </SQuestionWrapper>
        {answers.map((answer, idx) => (
          <SInputWrapper key={idx} $colSpan={3 - columns}>
            <SColumnTitle>{columnTitles[`h${idx + 2}`]}</SColumnTitle>
            <SAnswerWrapper isCorrect={!!findMatching(answer, idx)}>
              {answer}
            </SAnswerWrapper>
          </SInputWrapper>
        ))}
      </SItemContent>
    </SWrapper>
  );
};

const SAnswerWrapper = styled.div<{ isCorrect: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid transparent;
  height: 44px;
  padding: 8px 12px;
  margin: 0 0 8px;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: #2d2d3a;
  cursor: pointer;
  border-radius: 6px;
  background: #ffffff;
  width: 100%;

  ${({ isCorrect }) =>
    isCorrect
      ? `
        border-color: #39B54A; 
        background-color: rgba(247, 255, 230, 0.8);
      `
      : `
        border-color: #FF5858; 
        background-color: rgba(255, 230, 230, 0.8);
      `}

  ${customMediaQuery('tablet')} {
    justify-content: center;
    height: 50px;
    padding: 0 20px;
    margin: 0;
    font-size: 1rem;
    border-width: 2px;
  }
`;

export default AnswerStatementItem;
