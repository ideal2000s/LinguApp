import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { motion as m, useTransform, useMotionValue } from 'framer-motion';
import arrowBtnIcon from './right-arrow.svg';

interface IProps {
  className?: string;
  progress?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
const ProgressButton: React.FC<IProps> = ({
  className,
  progress = 1,
  onClick,
  disabled
}) => {
  const progressValue = useMotionValue(progress);
  const progressRange = useTransform(progressValue, [0, 1], [0, 1]);
  return (
    <SProgressWrapper className={cn(className)}>
      <SProgressButton>
        <SProgressCircle>
          <SSvg width="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 44 44">
            <m.path
              fill="none"
              strokeWidth="2"
              stroke="white"
              opacity="0.1"
              // strokeDasharray="0 1"
              d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
              animate={{ translateZ: 0 }}
              style={{
                translateX: 2,
                translateY: 2
              }}
            />
            <m.path
              fill="none"
              strokeWidth="2"
              stroke="white"
              strokeDasharray="0 1"
              d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
              animate={{ translateZ: 0 }}
              style={{
                pathLength: progressRange,
                rotate: 90,
                translateX: 2,
                translateY: 2,
                scaleX: -1 // Reverse direction of line animation
              }}
            />
          </SSvg>
        </SProgressCircle>
        <SButton onClick={onClick} disabled={disabled} />
      </SProgressButton>
    </SProgressWrapper>
  );
};

export default ProgressButton;

const SProgressWrapper = styled.div`
  width: 100px;
  height: 100px;
`;
const SProgressButton = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    width: 108px;
    height: 108px;
  }
`;

const SButton = styled.button`
  z-index: 1;
  border-radius: 50%;
  background: url(${arrowBtnIcon}), white;
  box-shadow: 0 4px 0 rgba(7, 68, 90, 0.6);
  border: none;
  background-position: center;
  background-repeat: no-repeat;
  width: 76px;
  height: 76px;
  padding: 0;
  transition: all 300ms;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    width: 82px;
    height: 82px;
  }

  &:focus {
    outline-color: transparent;
    outline: none;
  }

  &:hover {
    box-shadow: inset 0 0 0 3px #66d6f3;
  }

  &:active {
    opacity: 0.8;
    transform: scale(0.95);
  }
`;

const SProgressCircle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    width: 108px;
    height: 108px;
  }
`;

const SSvg = styled(m.svg)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
