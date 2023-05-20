import React, { useState } from 'react';
import { t } from 'i18n';
import { NextButton } from 'students/views/shared/components/Buttons';
import { ICircleButton } from 'students/views/shared/components/CircleButton/CircleButton';
import {
  growingBubbleChanger,
  setFinishButtonPosition
} from 'students/views/shared/bundles/bubbleAnimationManager';

interface IProps extends ICircleButton {
  onClickAnimationComplete?: () => void;
}

const GROW_DURATION = 500;

const GameFinishButton: React.FC<IProps> = ({
  title,
  onClick,
  onClickAnimationComplete
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const viewportOffset = e.currentTarget.getBoundingClientRect();
    setFinishButtonPosition(
      viewportOffset.left,
      viewportOffset.top,
      e.currentTarget.offsetWidth,
      e.currentTarget.offsetHeight
    );
    setButtonClicked(true);
    onClick?.(e);
    if (onClickAnimationComplete) setTimeout(onClickAnimationComplete, GROW_DURATION);
  };
  return (
    <>
      <NextButton
        onClick={handleClick}
        title={title || t('frontend.lesson_task.finish_button')}
        shadowColor="#00000030"
        size="6rem"
      />
      {buttonClicked && growingBubbleChanger()}
    </>
  );
};

export default GameFinishButton;
