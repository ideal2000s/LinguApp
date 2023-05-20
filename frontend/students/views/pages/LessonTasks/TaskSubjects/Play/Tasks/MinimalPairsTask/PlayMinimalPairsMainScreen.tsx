import React, { useMemo, useState } from 'react';
import { IMinimalPairsTask } from 'students/models/lessonTasks';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import MinimalPairsItem, { ISelectAnswerPayload } from './MinimalPairsItem';

interface IProps {
  task: IMinimalPairsTask;
  onComplete: () => void;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
}

const PlayMinimalPairsMainScreen: React.FC<IProps> = ({
  task,
  onComplete,
  onSelectAnswer
}) => {
  const { items } = task;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = useMemo(() => items[currentIndex], [currentIndex, items]);

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
    setTimeout(() => handleNext(), 1000);
  };

  return (
    <>
      <MinimalPairsItem onSelectAnswer={handleSelectAnswer} item={currentItem} />

      <DashedPagination
        itemsNumber={items.length}
        currentIndex={currentIndex}
        onNext={handleNext}
      />
    </>
  );
};

export default PlayMinimalPairsMainScreen;
