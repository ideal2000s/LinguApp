import React, { FC, ReactElement, useCallback, useState } from 'react';
import cn from 'classnames';
import { OverlayTrigger } from 'react-bootstrap';
import { OverlayChildren } from 'react-bootstrap/Overlay';
import { createGlobalStyle } from 'styled-components';
import { customMediaQuery } from 'students/views/shared/styled';
import { useBreakPoint } from 'students/views/shared/hooks';

interface IMessageActionsTooltip {
  popover: (toggleTooltip: () => void, hideTooltip: () => void) => OverlayChildren;
  children: (toggleTooltip: () => void, hideTooltip: () => void) => ReactElement;
  className?: string;
}

const MessageActionsTooltip: FC<IMessageActionsTooltip> = ({
  popover,
  children,
  className
}) => {
  const isMobile = useBreakPoint('sm', true);
  const [show, setShow] = useState<boolean>(false);

  const toggleTooltip = useCallback(() => {
    setShow((prev) => !prev);
  }, [setShow]);

  const hideTooltip = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <div className={cn(className)}>
      <GlobalTooltipStyle />

      <OverlayTrigger
        rootClose
        show={show}
        placement={isMobile ? 'top' : 'bottom-end'}
        overlay={popover(toggleTooltip, hideTooltip)}
      >
        {children(toggleTooltip, hideTooltip)}
      </OverlayTrigger>
    </div>
  );
};

export default MessageActionsTooltip;

const GlobalTooltipStyle = createGlobalStyle`
  #options-tooltip {
    z-index: 1;

    .tooltip-inner {
      background: rgba(255, 255, 255, 0.96);
      box-shadow: 0 0 20px rgba(45, 43, 57, 0.1);
      backdrop-filter: blur(4px);
      border-radius: 8px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      transform: translateY(calc(100% + 10px));

      ${customMediaQuery('tablet')} {
        margin-top: -20px;
        transform: none;
      }
    }
  }
`;
