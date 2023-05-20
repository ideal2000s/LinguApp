import React, { FC, useState, useCallback } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { Translate } from 'i18n';
import Countdown from './Countdown';

interface IResendCodeButton {
  timeout?: number;
  onClick: () => void;
  className?: string;
}

const DEFAULT_TIMEOUT = 30000;

const ResendCodeButton: FC<IResendCodeButton> = ({
  timeout = DEFAULT_TIMEOUT,
  onClick,
  className
}) => {
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdownEndTime, setCountdownEndTime] = useState<number>(Date.now() + timeout);

  const handleCountdownEnd = useCallback(() => {
    setShowCountdown(false);
  }, []);

  const handleClick = useCallback(() => {
    onClick();
    setShowCountdown(true);
    setCountdownEndTime(Date.now() + timeout);
  }, [onClick, timeout]);

  return (
    <SWrapper className={cn(className)}>
      <SText>
        <Translate str="frontend.auth.did_not_receive_a_code" />
      </SText>

      <SLink disabled={showCountdown} onClick={handleClick}>
        <Translate str="frontend.auth.resend_code" />

        {showCountdown && (
          <div className="d-flex">
            (<Countdown date={countdownEndTime} onEnd={handleCountdownEnd} />)
          </div>
        )}
      </SLink>
    </SWrapper>
  );
};

export default ResendCodeButton;

const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: #5e5d71;
  margin: 0 4px 0 0;
  padding: 0;
`;

const SLink = styled.button<{ disabled: boolean }>`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  text-decoration: none;
  color: #00a5d7;
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;
  cursor: pointer;
  min-width: ${({ disabled }) => (disabled ? '150px' : 'unset')};
  display: flex;
  justify-content: start;
  align-items: center;

  ${({ disabled }) =>
    disabled
      ? `
    cursor: not-allowed;
    opacity: 0.7;
  `
      : ''}

  &:hover {
    text-decoration: none;
  }
`;
