import React, { FC, useState, useMemo } from 'react';
import styled from 'styled-components';
import { IFillInTableItem } from 'students/models/lessonTasks';
import { customMediaQuery } from 'students/views/shared/styled';
import { AudioPlayer } from 'common/module/AudioPlayer';

export interface ISelectAnswerPayload {
  itemId: number;
  answers: string[];
}

interface IStatementItem {
  item: Pick<IFillInTableItem, 'id' | 'audioURL' | 'question'>;
  onSelectAnswer?: ({ itemId, answers }: ISelectAnswerPayload) => void;
  columnTitles: Record<string, any>;
  columnsNumber: number;
  value?: string[];
}

const StatementItem: FC<IStatementItem> = ({
  item,
  onSelectAnswer,
  columnTitles,
  columnsNumber,
  value
}) => {
  const [answers, setAnswers] = useState<string[]>(
    value?.length ? value : Array.from({ length: columnsNumber || 1 }).map(() => '')
  );

  const handleInputChange = (index: number, inputValue: string) => {
    setAnswers((prevAnswers: string[]) => [
      ...prevAnswers.slice(0, index),
      inputValue,
      ...prevAnswers.slice(index + 1)
    ]);

    if (item) {
      onSelectAnswer &&
        onSelectAnswer({
          itemId: item.id,
          answers: [...answers.slice(0, index), inputValue, ...answers.slice(index + 1)]
        });
    }
  };

  const questionBody = useMemo(() => {
    if (item?.audioURL) {
      return <SAudioPlayer src={item.audioURL} size="sm" withDurationFix />;
    }

    return <SQuestion>{item?.question}</SQuestion>;
  }, [item]);

  return (
    <SWrapper>
      <SItemContent>
        <SQuestionWrapper>
          <SColumnTitle>{columnTitles.h1}</SColumnTitle>

          {questionBody}
        </SQuestionWrapper>

        {answers.map((answer, i) => (
          <SInputWrapper key={i} $colSpan={3 - columnsNumber}>
            <SColumnTitle>{columnTitles[`h${i + 2}`]}</SColumnTitle>

            <SInput
              id={`${item?.id || 0}_column${i + 1}`}
              value={answer}
              onChange={(e) => handleInputChange(i, e.target.value)}
              aria-label={columnTitles[`h${i + 2}`]}
              autoComplete="off"
            />
          </SInputWrapper>
        ))}
      </SItemContent>
    </SWrapper>
  );
};

export default StatementItem;

export const SWrapper = styled.div<{ $isDemo?: boolean }>`
  border-radius: 8px;
  background: rgba(238, 238, 246, 0.8);
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${customMediaQuery('tablet')} {
    border-radius: 12px;
    margin-bottom: 4px;
  }
`;

export const SQuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const SColumnTitle = styled.h2`
  border-right: 1px solid #ffffff;
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: inherit;
  margin: 0 16px 0 0;
  padding: 0 16px 0 0;
  text-transform: uppercase;
  color: #5e5d71;
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

export const SItemContent = styled.div`
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

export const SQuestion = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: #2d2d3a;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  padding: 12px;
  margin: 0 0 8px;
  width: 100%;

  ${customMediaQuery('tablet')} {
    background: none;
    padding: 0;
    margin: 0;
    color: #2d2d3a;
    align-self: center;
    font-size: 1.125rem;
  }
`;

export const SInputWrapper = styled.div<{ $colSpan: number }>`
  grid-column-end: span ${({ $colSpan }) => $colSpan};
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child input {
    margin: 0;
  }

  ${customMediaQuery('tablet')} {
    border-left: 1px solid #ffffff;
    padding-left: 1rem;
  }
`;

const SInput = styled.input`
  height: 44px;
  padding: 8px 12px;
  margin: 0 0 8px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: #5e5d71;
  box-shadow: inset 0 2px 0 #e4e4f4;
  border: none;
  border-radius: 8px;
  background: #ffffff;
  width: 100%;

  &:hover,
  &:focus,
  &:active {
    outline: none;
    border: 2px solid #00a5d7;
    padding: 6px 10px !important;
    box-shadow: none;
  }

  ${customMediaQuery('tablet')} {
    height: 50px;
    padding: 0 20px;
    margin: 0;
    font-size: 1rem;

    &:hover,
    &:focus,
    &:active {
      margin: 0 !important;
      padding: 6px 18px !important;
    }
  }
`;

export const SAudioPlayer = styled(AudioPlayer)`
  span {
    font-size: 1.25rem;
  }
`;
