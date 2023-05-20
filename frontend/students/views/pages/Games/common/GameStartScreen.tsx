import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { StartButton } from 'students/views/shared/components/Buttons';
import { customMediaQuery } from 'students/views/shared/styled';
import {
  setStartButtonPosition,
  isFinishButtonDetected,
  shrinkingBubbleChanger
} from 'students/views/shared/bundles/bubbleAnimationManager';

interface IProps {
  heading: string;
  onStart: () => void;
}

const GameStartScreen: React.FC<IProps> = ({ heading, onStart }) => {
  const showBubbleAnimation = isFinishButtonDetected();
  useLayoutEffect(() => {
    if (showBubbleAnimation) document.body.style.visibility = 'hidden';
  }, [showBubbleAnimation]);

  const animationControls = useAnimation();
  const headingControls = useAnimation();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [startButtonPositioned, setStartButtonPositioned] = useState(false);

  useEffect(() => {
    if (showBubbleAnimation) {
      if (buttonRef.current) {
        const viewportOffset = buttonRef.current.getBoundingClientRect();
        setStartButtonPosition(
          viewportOffset.left,
          viewportOffset.top,
          buttonRef.current.offsetWidth,
          buttonRef.current.offsetHeight
        );
        document.body.style.visibility = 'visible';
        setStartButtonPositioned(true);
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
  }, [animationControls, buttonRef, showBubbleAnimation]);

  const handleStart = async () => {
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
    <SContainer>
      <SHeading animate={headingControls}>{heading}</SHeading>
      <motion.div
        ref={buttonRef}
        animate={animationControls}
        initial={{
          width: showBubbleAnimation ? 100 : 210,
          height: showBubbleAnimation ? 100 : 210
        }}
      >
        <SStartButton onClick={handleStart} size="100%" />
      </motion.div>
      {startButtonPositioned && shrinkingBubbleChanger()}
    </SContainer>
  );
};

export default GameStartScreen;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  height: 100vh;
  width: 100%;
  padding: 2rem;
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
