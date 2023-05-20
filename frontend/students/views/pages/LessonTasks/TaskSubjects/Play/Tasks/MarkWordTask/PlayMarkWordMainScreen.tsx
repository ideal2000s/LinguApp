import React, { useState } from 'react';
import styled from 'styled-components';
import { IMarkWordTask } from 'students/models/lessonTasks';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import MarkWordItem, { ISelectAnswerPayload } from './MarkWordItem';

interface IProps {
  task: IMarkWordTask;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  onComplete: () => void;
}

const PlayMarkWordMainScreen: React.FC<IProps> = ({
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

    handleNext();
  };

  return (
    <>
      <SMarkWordItem item={currentItem} onSelectAnswer={handleSelectAnswer} />

      <DashedPagination
        itemsNumber={items.length}
        currentIndex={currentIndex}
        onNext={handleNext}
      />
    </>
  );
};

export default PlayMarkWordMainScreen;

const SMarkWordItem = styled(MarkWordItem)`
  flex-grow: 2;
`;
