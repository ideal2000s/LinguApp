import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { withFade2 } from 'students/views/shared/HOCs';
import { Translate } from 'i18n';
import { NextButton } from 'students/views/shared/components/Buttons';
import {
  isFinishButtonDetected,
  setStartButtonPosition
} from 'students/views/shared/bundles/bubbleAnimationManager';

interface IProps {
  onNext: () => void;
  color: string;
  isCompleting?: boolean;
}
const NotSupportedTask: React.FC<IProps> = ({
  onNext,
  color = 'black',
  isCompleting
}) => {
  const nextButtonRef = useBubbleAnimation();

  const handleClick = () => {
    onNext();
  };

  return (
    <SNotSupportedTask>
      <h1>
        <Translate str="frontend.lesson_task.not_available_task" />
      </h1>

      <div ref={nextButtonRef}>
        <NextButton
          onClick={handleClick}
          disabled={isCompleting}
          showSpinner={isCompleting}
          iconColor={color}
          size="6rem"
          shadowColor="none"
        />
      </div>
    </SNotSupportedTask>
  );
};

export default withFade2<IProps>({ duration: 800, className: 'd-flex flex-grow-1' })(
  NotSupportedTask
);

const SNotSupportedTask = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  text-align: center;
`;

const useBubbleAnimation = () => {
  const showBubbleAnimation = isFinishButtonDetected();
  const nextButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showBubbleAnimation && nextButtonRef.current) {
      const viewportOffset = nextButtonRef.current.getBoundingClientRect();
      setStartButtonPosition(
        viewportOffset.left,
        viewportOffset.top + 16,
        nextButtonRef.current.offsetWidth,
        nextButtonRef.current.offsetHeight - 16 * 2
      );
    }
  }, [showBubbleAnimation, nextButtonRef]);

  return nextButtonRef;
};
