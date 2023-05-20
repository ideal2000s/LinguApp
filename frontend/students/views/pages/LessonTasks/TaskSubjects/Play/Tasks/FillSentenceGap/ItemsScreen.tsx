import React, { useState } from 'react';
import styled from 'styled-components';
import { IFillSentenceGapTask } from 'students/models/lessonTasks';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import SentenceGapItem, {
  IItemSelectAnswerPayload,
  ISelectAnswerPayload
} from './components/SentenceGapItem';
import ItemResultScreen from './components/ItemResultScreen';

enum Screen {
  Item = 'item',
  Result = 'result'
}

interface IProps {
  task: IFillSentenceGapTask;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  onComplete: () => void;
}

const ItemsScreen: React.FC<IProps> = ({ task, onSelectAnswer, onComplete }) => {
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
    setCurrentScreen(Screen.Result);

    onSelectAnswer({ ...payload, itemIndex: currentIndex });
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
            <SSentenceGapItemWrapper>
              <SentenceGapItem
                key={currentItem.id}
                item={currentItem}
                onSelectAnswer={handleSelectAnswer}
              />
            </SSentenceGapItemWrapper>

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

export default ItemsScreen;

const SSentenceGapItemWrapper = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
