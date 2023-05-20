import React, { ReactElement } from 'react';
import { BubbleChanger } from '../components/BubbleChanger';

interface ButtonPosition {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface CustomWindow extends Window {
  linguBubbleStartButtonPosition?: ButtonPosition;
  linguBubbleFinishButtonPosition?: ButtonPosition;
}

declare let window: CustomWindow;

export const setStartButtonPosition = (
  left: number,
  top: number,
  width: number,
  height: number
): void => {
  window.linguBubbleStartButtonPosition = { left, top, width, height };
  window.dispatchEvent(new Event('startButtonPositioned'));
};

export const setFinishButtonPosition = (
  left: number,
  top: number,
  width: number,
  height: number
): void => {
  window.linguBubbleFinishButtonPosition = { left, top, width, height };
};

export const getStartButtonPosition = (): ButtonPosition | undefined => {
  return window.linguBubbleStartButtonPosition;
};

export const getFinishButtonPosition = (): ButtonPosition | undefined => {
  return window.linguBubbleFinishButtonPosition;
};

export const isFinishButtonDetected = (): boolean => {
  return !!window.linguBubbleFinishButtonPosition;
};

export const onStartButtonPositioned = (callback: () => void): void => {
  window.addEventListener('startButtonPositioned', callback);
};

export const offStartButtonPositioned = (callback: () => void): void => {
  window.removeEventListener('startButtonPositioned', callback);
};

export const clearAnimationData = (): void => {
  window.linguBubbleStartButtonPosition = undefined;
  window.linguBubbleFinishButtonPosition = undefined;
};

export const growingBubbleChanger = (): ReactElement | null => {
  const finishButtonPosition = getFinishButtonPosition();
  if (finishButtonPosition) {
    const { left, top, width, height } = finishButtonPosition;
    return (
      <BubbleChanger
        type="grow"
        left={`${left}px`}
        top={`${top}px`}
        width={`${width}px`}
        height={`${height}px`}
      />
    );
  } else {
    return null;
  }
};

export const shrinkingBubbleChanger = (): ReactElement | null => {
  const startButtonPosition = getStartButtonPosition();
  if (startButtonPosition) {
    const { left, top, width, height } = startButtonPosition;
    return (
      <BubbleChanger
        type="shrink"
        left={`${left}px`}
        top={`${top}px`}
        width={`${width}px`}
        height={`${height}px`}
      />
    );
  } else {
    return null;
  }
};

export const loadingBubbleChanger = (): ReactElement | null => {
  const finishButtonPosition = getFinishButtonPosition();
  if (finishButtonPosition) {
    const { left, top, width, height } = finishButtonPosition;
    return (
      <BubbleChanger
        type="loading"
        left={`${left}px`}
        top={`${top}px`}
        width={`${width}px`}
        height={`${height}px`}
      />
    );
  } else {
    return null;
  }
};
