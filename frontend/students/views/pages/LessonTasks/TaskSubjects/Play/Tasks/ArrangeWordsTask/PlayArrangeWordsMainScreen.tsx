import React, { useState } from 'react';
import { IPlayArrangeWordsTask } from 'students/models/lessonTasks';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import ArrangeWordsItem, {
  IItemSelectAnswerPayload,
  ISelectAnswerPayload
} from './components/ArrangeWordsItem';
import ItemResultScreen from './components/ItemResultScreen';

enum Screen {
  Item = 'item',
  Result = 'result'
}

interface IProps {
  task: IPlayArrangeWordsTask;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  onComplete: () => void;
}

const PlayArrangeWordsMainScreen: React.FC<IProps> = ({
  task,
  onSelectAnswer,
  onComplete
}) => {
  const { items } = task;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Item);
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

  const handleSelectAnswer = (payload: IItemSelectAnswerPayload) => {
    setTimeout(async () => {
      setCurrentScreen(Screen.Result);
      onSelectAnswer({ ...payload, itemIndex: currentIndex });
    }, 1000);
  };

  const handleItemFinished = () => {
    setCurrentScreen(Screen.Item);
    handleNext();
  };

  const renderScreen = (screen: Screen): JSX.Element | null => {
    switch (screen) {
      case Screen.Item:
        return (
          <>
            <ArrangeWordsItem
              key={currentItem.id}
              className="flex-grow-1"
              item={currentItem}
              onSelectAnswer={handleSelectAnswer}
            />

            <DashedPagination
              itemsNumber={items.length}
              currentIndex={currentIndex}
              onNext={handleNext}
            />
          </>
        );
      case Screen.Result:
        return <ItemResultScreen item={currentItem} onFinish={handleItemFinished} />;
      default:
        return null;
    }
  };

  return renderScreen(currentScreen);
};

export default PlayArrangeWordsMainScreen;
