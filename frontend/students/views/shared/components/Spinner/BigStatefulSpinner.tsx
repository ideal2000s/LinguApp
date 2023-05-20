import React from 'react';
import styled from 'styled-components';
import { StatefulSpinner } from '.';

interface IProps {
  actionsToSubscribe: string[];
  className?: string;
  timeout?: number;
  twoStepAnimation?: boolean;
  onStart?: () => void;
  onFinish?: () => void;
}

const DEFAULT_TIMEOUT = 500;
const BigStatefulSpinner: React.FC<IProps> = ({
  actionsToSubscribe,
  className,
  timeout = DEFAULT_TIMEOUT,
  twoStepAnimation = true,
  onStart,
  onFinish
}) => {
  return (
    <SStatefulSpinner
      actionsToSubscribe={actionsToSubscribe}
      className={className}
      timeout={timeout}
      twoStepAnimation={twoStepAnimation}
      onStart={onStart}
      onFinish={onFinish}
    />
  );
};

export default BigStatefulSpinner;

const SStatefulSpinner = styled(StatefulSpinner)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: #ffffff;
`;
