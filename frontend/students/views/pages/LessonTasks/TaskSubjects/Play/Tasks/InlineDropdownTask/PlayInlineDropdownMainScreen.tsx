import React, { useState } from 'react';
import styled from 'styled-components';
import { IInlineDropdownTask } from 'students/models/lessonTasks';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import InlineDropdownItem, { ISelectAnswerPayload } from './InlineDropdownItem';

interface IProps {
  task: IInlineDropdownTask;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  onComplete: () => void;
}

const PlayInlineDropdownMainScreen: React.FC<IProps> = ({
  task,
  onSelectAnswer,
  onComplete
}) => {
  const { items } = task;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = items[currentIndex];

  const handleComplete = () => {
    onComplete();
  };

  const handleNext = () => {
    if (currentIndex + 1 === items.length) {
      handleComplete();
    } else {
      setCurrentIndex((currentIndex) => currentIndex + 1);
    }
  };

  const handleSelectAnswer = (payload: ISelectAnswerPayload) => {
    onSelectAnswer(payload);
  };

  return (
    <>
      <STaskHeader>&nbsp;</STaskHeader>

      <SInlineDropdownItem
        key={currentItem.id}
        item={currentItem}
        onSelectAnswer={handleSelectAnswer}
        onItemFinished={handleNext}
      />

      <DashedPagination
        itemsNumber={items.length}
        currentIndex={currentIndex}
        onNext={handleNext}
      />
    </>
  );
};

export default PlayInlineDropdownMainScreen;

const STaskHeader = styled.h2`
  color: #fbfcffaa;
  margin-top: 30px;
  margin-bottom: 0;
  font-size: 0.875rem;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.linguBptLg}) {
    margin-top: 45px;
    font-size: 1.125rem;
  }
`;

const SInlineDropdownItem = styled(InlineDropdownItem)`
  margin-top: -40px;

  @media (min-width: ${({ theme }) => theme.linguBptMs}) {
    margin-top: -80px;
  }
`;
