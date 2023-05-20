import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import cn from 'classnames';
import { motion } from 'framer-motion';
import circlesBlurringData from './circles_blur_preloader.json';
import LottieIcon from '../LottieIcon/LottieIcon';

interface IProps {
  type: 'grow' | 'shrink' | 'loading';
  left?: string;
  top?: string;
  width?: string;
  height?: string;
  className?: string;
}

const GROW_DURATION = 500;

const BubbleChanger: React.FC<IProps> = ({
  type,
  left = '50%',
  top = '50%',
  width = '100px',
  height = '100px',
  className
}) => {
  const [target, setTarget] = useState<'initial' | 'grow' | 'shrink' | 'loading'>(
    type === 'loading' ? 'loading' : 'initial'
  );

  useEffect(() => {
    let timerId: number | null = null;

    if (target === 'initial') {
      timerId = window.setTimeout(() => {
        setTarget(type);
      }, 100);
    } else if (target === 'grow' || target === 'shrink') {
      timerId = window.setTimeout(() => {
        setTarget('loading');
      }, GROW_DURATION);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [target, type]);

  return (
    <>
      {target === 'loading' && type !== 'shrink' && (
        <SContainer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          >
            <LottieIcon
              animationJSONData={circlesBlurringData}
              width="100%"
              height="100%"
              loop={true}
              autoPlay={true}
            />
          </motion.div>
        </SContainer>
      )}
      <SCircle
        className={cn(className, target)}
        $width={width}
        $height={height}
        $left={left}
        $top={top}
        $type={type}
      ></SCircle>
    </>
  );
};

export default BubbleChanger;

const SContainer = styled.div`
  position: fixed;
  z-index: 1001;
  background: #ffffff;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const SCircle = styled.div<{
  $type: string;
  $left: string;
  $top: string;
  $width: string;
  $height: string;
}>`
  position: fixed;
  z-index: 1000;
  background: #ffffff;
  box-shadow: 0px 4px 0px rgba(0, 0, 0, 0.2);
  border-radius: 50%;

  ${({ $type, $left, $top, $width, $height }) =>
    $type === 'grow' &&
    css`
      left: ${$left};
      top: ${$top};
      width: ${$width};
      height: ${$height};

      &.grow,
      &.loading {
        animation: bubbleGrow ${GROW_DURATION}ms ease-in forwards;
        transform-origin: left;
      }
    `}

  ${({ $type, $left, $top, $width, $height }) =>
    $type === 'shrink' &&
    css`
      left: ${$left};
      top: ${$top};
      width: ${$width};
      height: ${$height};
      transform-origin: right;
      transform: translate3d(2500px, 0, 0) scale(50);

      &.shrink {
        animation: bubbleShrink ${GROW_DURATION}ms ease-out forwards;
      }
    `}
  
  &.loading {
    display: none;
  }

  @keyframes bubbleGrow {
    0% {
      transform: translate3d(0, 0, 0) scale(1);
    }
    60% {
      transform: translate3d(-200px, 0, 0) scale(30);
    }
    100% {
      transform: translate3d(-2500px, 0, 0) scale(50);
    }
  }

  @keyframes bubbleShrink {
    0% {
      transform: translate3d(2500px, 0, 0) scale(50);
    }
    40% {
      transform: translate3d(200px, 0, 0) scale(30);
    }
    100% {
      transform: translate3d(0, 0, 0) scale(1);
    }
  }
`;
