import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { IPlayAuditionTask } from 'students/models/lessonTasks';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import AuditionItem, { ISelectAnswerPayload } from './components/AuditionItem';

interface IProps {
  task: IPlayAuditionTask;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  onComplete: () => void;
}

const PlayAuditionMainScreen: React.FC<IProps> = ({
  task,
  onSelectAnswer,
  onComplete
}) => {
  const { audioURL, items } = task;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = items[currentIndex];
  const audioItemStartSec = currentIndex > 0 ? items[currentIndex - 1].start : 0;

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 === items.length) {
      handleComplete();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [handleComplete, currentIndex, items.length]);

  const handleSelectAnswer = useCallback(
    (payload: ISelectAnswerPayload) => {
      onSelectAnswer(payload);
      handleNext();
    },
    [handleNext, onSelectAnswer]
  );

  return (
    <>
      <SAuditionItem
        audioUrl={audioURL}
        item={currentItem}
        onSelectAnswer={handleSelectAnswer}
        from={audioItemStartSec}
      />

      <SPaginationWrapper>
        <DashedPagination
          itemsNumber={items.length}
          currentIndex={currentIndex}
          onNext={handleNext}
        />
      </SPaginationWrapper>
    </>
  );
};

export default PlayAuditionMainScreen;

const SAuditionItem = styled(AuditionItem)`
  flex-grow: 2;
  align-self: stretch;
  padding-bottom: 2rem;
`;

const SPaginationWrapper = styled.div`
  position: absolute;
  bottom: 16px;
`;
