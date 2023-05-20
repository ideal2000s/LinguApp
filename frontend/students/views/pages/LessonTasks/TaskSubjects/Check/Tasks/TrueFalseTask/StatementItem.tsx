import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18n';
import ButtonGeneral from 'students/views/shared/components/ButtonGeneral';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';

export interface ISelectAnswerPayload {
  value: boolean;
  itemId: number;
}

interface IProps {
  options: {
    itemId: number;
    statement: string;
    status: boolean | null;
  };
  onSelectAnswer: ({ value, itemId }: ISelectAnswerPayload) => void;
}

const StatementItem: React.FC<IProps> = ({ options, onSelectAnswer }) => {
  const { itemId, statement, status } = options;

  const handleSelectAnswer = (value: boolean) => {
    onSelectAnswer({
      value,
      itemId
    });
  };

  return (
    <SItemContainer>
      <STrueFalseQuestion>{statement}</STrueFalseQuestion>

      <SActionContainer>
        <SButton
          variant="light"
          className={cn({ selected: true === status })}
          onClick={() => handleSelectAnswer(true)}
          role="checkbox"
          aria-checked="true"
          aria-label={t('frontend.lesson_task.tasks.check.true_false.true')}
        >
          <FontAwesomeIcon className="ml-0" icon={faCheck} />
        </SButton>

        <SButton
          variant="light"
          className={cn({ selected: false === status })}
          onClick={() => handleSelectAnswer(false)}
          role="checkbox"
          aria-checked="false"
          aria-label={t('frontend.lesson_task.tasks.check.true_false.false')}
        >
          <FontAwesomeIcon className="ml-0" icon={faTimes} />
        </SButton>
      </SActionContainer>
    </SItemContainer>
  );
};

export default StatementItem;

export const SItemContainer = styled.div`
  font-family: 'Inter', ${({ theme }) => theme.linguFontFamily};
  font-weight: 500;
  border-radius: 6px;
  background: #e6e6f077;
  padding: 18px;
  margin-bottom: 16px;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const SActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-basis: 125px;
`;

export const STrueFalseQuestion = styled.div`
  margin-bottom: 16px;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    align-items: center;
    margin-bottom: 0;
    width: calc(100% - 100px);
    padding-right: 1rem;
  }
`;

const SButton = styled(ButtonGeneral)`
  font-size: 1.5rem;
  border-radius: 10px;
  background: linear-gradient(180deg, #f5f5fa 0%, #ffffff 100%);
  box-shadow: 0px 2px 0px #d6d6f1, inset 0px 2px 0px #ffffff;
  color: #a3a2c0;
  width: calc(50% - 10px);
  height: 3.5rem;

  ${styleInnerButton()} {
    padding: 0.5rem;
  }

  &.selected {
    background: linear-gradient(0deg, #25b6e5 6.9%, #00a5d7 94.83%);
    box-shadow: inset 0px 2px 0px #44c6ee, inset 0px -2px 0px #0094c5;
    color: #ffffff;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    border-radius: 50%;
    width: 3.5rem;
  }
`;
