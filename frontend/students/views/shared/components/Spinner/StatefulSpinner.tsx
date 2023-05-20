import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { requestingSelectors } from 'students/stores/requesting';
import { tAppState } from 'students/stores/rootStore';

import { useAnimateScenarios, useBreakPoint } from 'students/views/shared/hooks';
import { animationScenarios } from './animation/scenarios';
import LottieIcon from '../LottieIcon';
import spinnerDots from './assets/spinnerDots.json';
import spinnerBubble from './assets/spinnerBubble.json';

const ICON_WIDTH_DESKTOP = '8rem';
const ICON_WIDTH_MOBILE = '4rem';

interface IProps {
  actionsToSubscribe: string[];
  className?: string;
  timeout?: number;
  twoStepAnimation?: boolean;
  onStart?: () => void;
  onFinish?: () => void;
}

const DEFAULT_TIMEOUT = 500;
const StatefulSpinner: React.FC<IProps> = ({
  actionsToSubscribe,
  className,
  timeout = DEFAULT_TIMEOUT,
  twoStepAnimation = true,
  onStart,
  onFinish
}) => {
  const [passedTimeout, setPassedTimeout] = useState(false);
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [controls, animateControls] = useAnimateScenarios(animationScenarios);
  const isMobile = useBreakPoint('sm', true);
  const isLoading = useSelector<tAppState, boolean>(
    requestingSelectors.selectHasRequestingActions(actionsToSubscribe)
  );

  useEffect(() => {
    let timeoutId = -1;
    if (isLoading) {
      timeoutId = window.setTimeout(() => {
        setPassedTimeout(true);
      }, timeout);
    } else {
      setPassedTimeout(false);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeout, isLoading, setPassedTimeout]);

  useEffect(() => {
    if (displaySpinner) {
      animateControls(['appear']);
      onStart && onStart();
    }
  }, [animateControls, displaySpinner, onStart]);

  useEffect(() => {
    if (passedTimeout && isLoading) {
      setDisplaySpinner(true);
    } else if (displaySpinner) {
      setTimeout(() => {
        setDisplaySpinner(false);
        onFinish && onFinish();
      }, 1500);
    }
  }, [passedTimeout, isLoading, displaySpinner, animateControls, onFinish]);

  const lottieProps = isLoading
    ? {
        animationJSONData: spinnerDots,
        loop: true,
        speed: 2
      }
    : twoStepAnimation
    ? {
        animationJSONData: spinnerBubble,
        loop: false,
        speed: 1
      }
    : null;

  return (
    <AnimatePresence>
      {displaySpinner ? (
        <SWrapper
          as={motion.div}
          initial={{
            opacity: 0
          }}
          animate={controls}
          exit={{ opacity: 0, transition: { type: 'Inertia', duration: 0.25 } }}
          className={cn(className)}
        >
          {lottieProps && (
            <LottieIcon
              width={isMobile ? ICON_WIDTH_MOBILE : ICON_WIDTH_DESKTOP}
              autoPlay
              {...lottieProps}
            />
          )}
        </SWrapper>
      ) : null}
    </AnimatePresence>
  );
};

export default StatefulSpinner;

const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
