import React, { FC, RefObject } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';
import cn from 'classnames';
import { customMediaQuery } from 'students/views/shared/styled';
import { useBreakPoint } from 'students/views/shared/hooks';

interface IHintTooltip {
  show: boolean;
  text: string;
  target: RefObject<HTMLTextAreaElement>;
  className?: string;
}

const HintTooltip: FC<IHintTooltip> = ({ show, text, target, className }) => {
  const isMobile = useBreakPoint('sm', true);

  return (
    <Overlay target={target.current} show={show} placement={isMobile ? 'top' : 'bottom'}>
      {({ arrowProps: _arrowProps, show: _show, ...props }) => (
        <div {...props}>
          <SWrapper className={cn(className)}>
            <Tooltip id="hint-tooltip">{text}</Tooltip>
          </SWrapper>
        </div>
      )}
    </Overlay>
  );
};

export default HintTooltip;

const SWrapper = styled.div`
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.375rem;
  color: #2d2d3a;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 125px;
  border-radius: 8px;
  margin-bottom: 26px;
  animation: shake 1400ms ease-in infinite;
  animation-delay: 1s;
  position: relative;

  &:before {
    content: '';
    width: 0;
    height: 0;
    background: transparent;
    transform: translate(-50%, 50%) rotate(-45deg);
    position: absolute;
    bottom: 1px;
    left: 50%;
    border-left: 8px solid rgba(255, 255, 255, 0.88);
    border-bottom: 8px solid rgba(255, 255, 255, 0.88);
    border-right: 8px solid transparent;
    border-top: 8px solid transparent;
  }

  ${customMediaQuery('tablet')} {
    font-size: 1.5rem;
    line-height: 1.625rem;
    height: 60px;
    width: 165px;
    margin-top: 16px;
    box-shadow: 0 5px 26px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
      top: 0;
      border-left: 10px solid rgba(255, 255, 255, 0.88);
      border-top: 10px solid rgba(255, 255, 255, 0.88);
      border-right: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
  }

  @keyframes shake {
    30% {
      margin-bottom: 22px;
    }

    60% {
      margin-bottom: 29px;
    }

    100% {
      margin-bottom: 26px;
    }

    ${customMediaQuery('tablet')} {
      30% {
        margin-top: 19px;
      }

      60% {
        margin-top: 13px;
      }

      100% {
        margin-top: 16px;
      }
    }
  }
`;
