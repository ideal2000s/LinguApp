import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IMultipleChoiceResultsItemOption } from 'students/models/lessonTasks/results';
import { customMediaQuery } from 'students/views/shared/styled';
import SChoiceAnswerContainer from '../../components/styled/SChoiceAnswerContainer';
import SAnswerOptionIconWrap from '../../components/styled/SAnswerOptionIconWrap';

interface IOptionItem {
  isAnswered: boolean;
  isCorrect: boolean;
}

interface IProps {
  option: IMultipleChoiceResultsItemOption;
  itemSession: {
    answer: boolean | null;
    taskItemOptionId: number;
  }[];
}

const AnswerOptionItem: React.FC<IProps> = ({ itemSession, option }) => {
  const { answer, id, correct } = option;
  const isAnswered = useMemo(
    () =>
      !!itemSession.find((opt) => {
        return opt.taskItemOptionId === id && opt.answer;
      }),
    [id, itemSession]
  );

  return (
    <SAnswerOptionItem isAnswered={isAnswered} isCorrect={correct}>
      <SAnswerOptionIconWrap>
        <SIcon icon={correct ? faCheck : faTimes} />
      </SAnswerOptionIconWrap>
      <SAnswerOptionText>{answer}</SAnswerOptionText>
    </SAnswerOptionItem>
  );
};

const SAnswerOptionItem = styled(SChoiceAnswerContainer)<IOptionItem>`
  border: 1px solid transparent;

  ${customMediaQuery('tablet')} {
    border-width: 2px;
  }

  ${({ isCorrect, isAnswered }) => {
    if (!isCorrect && isAnswered) {
      return `
        border-color: #ff5858;
        background: rgba(255, 229, 229, 0.8);
      `;
    }
    if (isCorrect && isAnswered) {
      return `
        border-color: #39a935;
        background: rgba(247, 255, 230, 0.8);
      `;
    }
    return '';
  }}
`;

const SAnswerOptionText = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  letter-spacing: -0.02em;
  color: #2d2d3a;
  opacity: 0.9;
  margin-left: 18px;
`;

const SIcon = styled(FontAwesomeIcon)`
  width: 100% !important;
`;

export default AnswerOptionItem;
