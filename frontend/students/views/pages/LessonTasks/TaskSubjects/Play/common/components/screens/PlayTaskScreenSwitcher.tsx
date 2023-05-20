import React, { useState } from 'react';
import cn from 'classnames';
import { FinishScreen, StartScreen } from '.';
import SPlayTaskWrapper from '../SPlayTaskWrapper';

type tScreenName = 'start' | 'main' | 'finish';
interface IProps {
  startScreenHeading: string;
  onExitFinishScreen: () => void;
  children: (goToFinishScreen: () => void) => JSX.Element | null;
  className?: string;
  isCompleting?: boolean;
  itemsExist: boolean; // to check if task items are not empty
}
const PlayTaskScreenSwitcher: React.FC<IProps> = ({
  startScreenHeading,
  onExitFinishScreen,
  children,
  className,
  isCompleting,
  itemsExist
}) => {
  const [currentScreen, setCurrentScreen] = useState<tScreenName>('start');

  const handleStartTask = () => {
    if (itemsExist) {
      setCurrentScreen('main');
    } else {
      setCurrentScreen('finish');
    }
  };

  const handleCompleteTask = () => {
    setCurrentScreen('finish');
  };

  const handleFinishTask = () => {
    onExitFinishScreen();
  };

  const renderScreen = (screen: tScreenName): JSX.Element | null => {
    switch (screen) {
      case 'start':
        return (
          <StartScreen
            isCompleting={isCompleting}
            onStart={handleStartTask}
            heading={startScreenHeading}
          />
        );
      case 'main':
        return children(handleCompleteTask);
      case 'finish':
        return <FinishScreen isCompleting={isCompleting} onFinish={handleFinishTask} />;
      default:
        return null;
    }
  };

  return (
    <SPlayTaskWrapper className={cn(className)}>
      {renderScreen(currentScreen)}
    </SPlayTaskWrapper>
  );
};

export default PlayTaskScreenSwitcher;
