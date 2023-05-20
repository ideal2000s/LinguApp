import React, { useCallback, useEffect, useState } from 'react';
import { filter, head } from 'lodash';
import { IPlayImageHotspotTask } from 'students/models/lessonTasks';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import ImageHotspotItem, { ISelectAnswerPayload } from './ImageHotspotItem';
interface IProps {
  task: IPlayImageHotspotTask;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  onComplete: () => void;
}

const PlayImageHotspotMainScreen: React.FC<IProps> = ({
  task,
  onSelectAnswer,
  onComplete
}) => {
  const { items, imageURL, image: imageSize } = task;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [uncompleted, setUncompleted] = useState<number[]>([]);
  const completedCount = items.length - uncompleted.length;

  useEffect(() => {
    setUncompleted(items.map((_, index) => index));
  }, [items]);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const handleNext = useCallback(() => {
    const newUncompleted = filter(uncompleted, (index) => index !== currentIndex);
    const newIndex = head(newUncompleted);
    if (newIndex === undefined) {
      setIsCompleted(true);
      setTimeout(() => handleComplete(), 1000);
    } else {
      setCurrentIndex(newIndex);
      setUncompleted(newUncompleted);
    }
  }, [handleComplete, currentIndex, uncompleted]);

  const handleSelectAnswer = useCallback(
    (payload: ISelectAnswerPayload) => {
      onSelectAnswer(payload);
      handleNext();
    },
    [handleNext, onSelectAnswer]
  );

  const handleSelectItem = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <>
      <ImageHotspotItem
        isCompleted={isCompleted}
        currentIndex={currentIndex}
        items={items}
        onSelectAnswer={handleSelectAnswer}
        onItemSelect={handleSelectItem}
        image={{ url: imageURL, size: imageSize }}
      />

      <DashedPagination
        itemsNumber={items.length}
        currentIndex={completedCount}
        onNext={handleNext}
      />
    </>
  );
};

export default PlayImageHotspotMainScreen;
