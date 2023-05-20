import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IPlayImageObjectTask } from 'students/models/lessonTasks';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import ImageObjectItem, { IPointOptions, ISelectAnswerPayload } from './ImageObjectItem';
import { customMediaQuery } from 'students/views/shared/styled';

interface IProps {
  task: IPlayImageObjectTask;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  onComplete: () => void;
}

const PlayImageObjectMainScreen: React.FC<IProps> = ({
  task,
  onSelectAnswer,
  onComplete
}) => {
  const { items, imageURL, image: imageSize } = task;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = items[currentIndex];
  const pointsRef = useRef<IPointOptions[]>([]);

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

    pointsRef.current.push({
      top: currentItem.top + currentItem.height / 2,
      left: currentItem.left + currentItem.width / 2
    });

    handleNext();
  };

  return (
    <>
      <ImageObjectItem
        currentIndex={currentIndex}
        item={items[currentIndex]}
        points={pointsRef.current}
        onSelectAnswer={handleSelectAnswer}
        imageURL={imageURL}
        imageSize={imageSize}
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

export default PlayImageObjectMainScreen;

const SPaginationWrapper = styled.div`
  ${customMediaQuery('mobile')} {
    position: absolute;
    bottom: 0;
  }
`;
