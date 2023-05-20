import React, { FC, useContext, useEffect, useState } from 'react';
import { IDictationTask } from 'students/models/lessonTasks';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import { PreferencesContext } from 'students/views/shared/providers/Preferences';

import DictationTaskItem, { ISelectAnswerPayload } from './components/DictationTaskItem';
import ErrorMessage from './components/ErrorMessage';

enum Screen {
  Item = 'item',
  Error = 'error'
}

interface IProps {
  task: IDictationTask;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  onComplete: () => void;
}

const initialScreenErrorPayload: ISelectAnswerPayload = {
  itemId: null,
  attemptsCount: 0
};

const PlayDictationMainScreen: FC<IProps> = ({ task, onSelectAnswer, onComplete }) => {
  const { items } = task;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Item);
  const [screenErrorPayload, setScreenErrorPayload] = useState<ISelectAnswerPayload>(
    initialScreenErrorPayload
  );
  const { hintsEffects } = useContext(PreferencesContext);
  const currentItem = items[currentIndex];

  useEffect(() => {
    setScreenErrorPayload(initialScreenErrorPayload);
  }, [currentIndex]);

  const handleComplete = () => {
    onComplete();
  };

  const handleNext = () => {
    if (currentIndex + 1 === items.length) {
      handleComplete();
    } else {
      setCurrentIndex((currentIndex) => currentIndex + 1);
      setCurrentScreen(Screen.Item);
    }
  };

  const selectAnswer = (payload: ISelectAnswerPayload) => {
    onSelectAnswer(payload);
    handleNext();
  };

  const handleSelectAnswer = (payload: ISelectAnswerPayload) => {
    selectAnswer(payload);
  };

  const goToWrongAnswerScreen = (payload: ISelectAnswerPayload) => {
    setCurrentScreen(Screen.Error);
    setScreenErrorPayload(payload);
  };

  const renderScreen = (screen: Screen): JSX.Element | null => {
    switch (screen) {
      case Screen.Item:
        return (
          <>
            <DictationTaskItem
              key={currentItem.id}
              item={currentItem}
              characters={task.characters}
              onSelectAnswer={handleSelectAnswer}
              goToWrongAnswerScreen={goToWrongAnswerScreen}
              showHint={hintsEffects && currentIndex === 0}
            />

            <DashedPagination
              itemsNumber={items.length}
              currentIndex={currentIndex}
              onNext={handleNext}
            />
          </>
        );

      case Screen.Error:
        return (
          <ErrorMessage
            header={currentItem.sentence}
            subHeader={currentItem.description}
            onClickNext={() => selectAnswer(screenErrorPayload)}
          />
        );

      default:
        return null;
    }
  };

  return renderScreen(currentScreen);
};

export default PlayDictationMainScreen;
