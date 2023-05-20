import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { customMediaQuery } from 'students/views/shared/styled';
import { withFade2 } from 'students/views/shared/HOCs';
import { StartButton } from 'students/views/shared/components/Buttons';
import {
  isFinishButtonDetected,
  setStartButtonPosition
} from 'students/views/shared/bundles/bubbleAnimationManager';
import { usePlayAudioPlayer } from '../../hooks';

interface IProps {
  onStart: () => void;
  isCompleting: boolean;
  heading: string;
}

const StartScreen: FC<IProps> = ({ isCompleting, onStart, heading }) => {
  const showBubbleAnimation = isFinishButtonDetected();

  const animationControls = useAnimation();
  const headingControls = useAnimation();
  const { playStartSound } = usePlayAudioPlayer();
  const startButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showBubbleAnimation) {
      if (startButtonRef.current) {
        const viewportOffset = startButtonRef.current.getBoundingClientRect();
        setStartButtonPosition(
          viewportOffset.left,
          viewportOffset.top,
          startButtonRef.current.offsetWidth,
          startButtonRef.current.offsetHeight
        );
      }
    } else {
      animationControls.start({
        width: 100,
        height: 100,
        transition: {
          duration: 0.6,
          ease: 'easeInOut'
        }
      });
    }
  }, [showBubbleAnimation, animationControls, startButtonRef]);

  const handleStart = async () => {
    playStartSound();

    await Promise.all([
      animationControls.start({
        width: 200,
        height: 200,
        opacity: [1, 0],
        transition: {
          duration: 0.6,
          ease: 'easeOut'
        },
        transitionEnd: { display: 'none' }
      }),
      headingControls.start({
        y: [0, 80],
        opacity: [1, 0],
        transition: {
          duration: 0.6,
          ease: 'easeOut'
        }
      })
    ]);

    onStart();
  };

  return (
    <SWrapper className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
      <SHeading animate={headingControls}>{heading}</SHeading>
      <motion.div
        ref={startButtonRef}
        animate={animationControls}
        initial={{
          width: showBubbleAnimation ? 100 : 210,
          height: showBubbleAnimation ? 100 : 210
        }}
      >
        <SStartButton onClick={handleStart} disabled={isCompleting} size="100%" />
      </motion.div>
    </SWrapper>
  );
};

export default withFade2<IProps>({ duration: 800, className: 'd-flex flex-grow-1' })(
  StartScreen
);

const SWrapper = styled.div`
  max-width: 670px;
`;

const SHeading = styled(motion.h2)`
  color: #fbfcff;
  margin: 0 0 50px;
  padding: 0;
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.625rem;
  text-align: center;

  ${customMediaQuery('tablet')} {
    font-size: 2.375rem;
    line-height: 3.125rem;
    margin: 0 0 90px;
  }
`;

const SStartButton = styled(StartButton)`
  font-size: 1.125rem;
  margin: 0;
  ${customMediaQuery('tablet')} {
    font-size: 1.375rem;
  }
`;
