import React, { useState } from 'react';
import styled from 'styled-components';
import { IMarkWordAudioTask } from 'students/models/lessonTasks';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import MarkWordAudioItem, { ISelectAnswerPayload } from './MarkWordAudioItem';

interface IProps {
  task: IMarkWordAudioTask;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  onComplete: () => void;
}

const PlayMarkWordAudioMainScreen: React.FC<IProps> = ({
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
      <SMarkWordAudioItem item={currentItem} onSelectItem={handleSelectAnswer} />

      <DashedPagination
        itemsNumber={items.length}
        currentIndex={currentIndex}
        onNext={handleNext}
      />
    </>
  );
};

export default PlayMarkWordAudioMainScreen;

const SMarkWordAudioItem = styled(MarkWordAudioItem)`
  flex-grow: 2;
`;
