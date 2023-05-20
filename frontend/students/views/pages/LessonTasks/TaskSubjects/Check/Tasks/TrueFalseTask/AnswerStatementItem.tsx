import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { customMediaQuery } from 'students/views/shared/styled';
import { SActionContainer, SItemContainer, STrueFalseQuestion } from './StatementItem';
import SAnswerOptionIconWrap from '../../components/styled/SAnswerOptionIconWrap';

interface IProps {
  solution: boolean;
  question: string;
  answer: boolean;
}

const AnswerTrueFalseItem: React.FC<IProps> = ({ solution, question, answer }) => {
  const isCorrect = useMemo(() => solution === answer, [solution, answer]);

  return (
    <SAnswerItemContainer isCorrect={isCorrect}>
      <STrueFalseQuestion>{question}</STrueFalseQuestion>
      <SAnswerContainer>
        <SAnswerIcon isAnswered={answer === true}>
          <FontAwesomeIcon icon={faCheck} />
        </SAnswerIcon>
        <SAnswerIcon isAnswered={answer === false}>
          <FontAwesomeIcon icon={faTimes} />
        </SAnswerIcon>
      </SAnswerContainer>
    </SAnswerItemContainer>
  );
};

const SAnswerItemContainer = styled(SItemContainer)<{
  isCorrect: boolean;
}>`
  border: 1px solid transparent;
  flex-direction: column;

  ${customMediaQuery('tablet')} {
    border-width: 2px;
    flex-direction: row;
  }

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
`;

const SAnswerContainer = styled(SActionContainer)`
  ${customMediaQuery('tablet')} {
    flex-basis: 92px;
  }
`;

const SAnswerIcon = styled(SAnswerOptionIconWrap)<{
  isAnswered: boolean;
}>`
  width: calc(50% - 16px);
  height: 2.75rem;
  border-radius: 6px;
  font-size: 1.125rem;

  ${customMediaQuery('tablet')} {
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
  }

  svg {
    width: inherit;
  }

  ${({ isAnswered }) =>
    !isAnswered &&
    `
      background: #fff; 
      border-color: #E6E6F0; 
      color: #A3A2C0;
      width:
    `}
`;

export default AnswerTrueFalseItem;
