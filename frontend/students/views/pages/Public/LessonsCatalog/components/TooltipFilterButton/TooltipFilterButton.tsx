import React, { FC, ReactNode, RefObject, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { OverlayTrigger } from 'react-bootstrap';
import { OverlayChildren } from 'react-bootstrap/Overlay';

type tPopoverPlacement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'bottom'
  | 'right'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end'
  | undefined;

interface ITooltipFilterButton {
  children: ReactNode;
  popover: (
    close: () => void,
    triggerRef: RefObject<HTMLButtonElement>
  ) => OverlayChildren;
  popoverPlacement?: tPopoverPlacement;
  isLight?: boolean;
  isActive?: boolean;
  className?: string;
}

const TooltipFilterButton: FC<ITooltipFilterButton> = ({
  children,
  popover,
  popoverPlacement,
  isLight,
  isActive,
  className
}) => {
  const buttonRef = useRef(null);
  const [show, setShow] = useState<boolean>(false);

  const toggle = useCallback(() => {
    setShow((prev) => !prev);
  }, [setShow]);

  const close = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <OverlayTrigger
      rootClose
      show={show}
      placement={popoverPlacement || 'bottom'}
      overlay={popover(close, buttonRef)}
    >
      <SFilterButton
        ref={buttonRef}
        $isLight={!!isLight}
        $isActive={!!isActive}
        onClick={toggle}
        className={cn(className)}
      >
        {children}
      </SFilterButton>
    </OverlayTrigger>
  );
};

export default TooltipFilterButton;

const SFilterButton = styled.button<{ $isActive: boolean; $isLight: boolean }>`
  border-radius: 8px;
  padding: 12px 16px;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #2d2d3a;
  margin-right: 12px;
  transition: background 0.3s, border 0.3s;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:last-child {
    margin-right: 0;
  }

  ${({ $isLight }) =>
    $isLight
      ? `
        background: #FFFFFF;
        border: 1px solid #EBEBEB;
        
        &:hover,
        &:focus,
        &:active {
          border: 1px solid #00A5D7;
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
          outline: none;
        }
      `
      : `
        background: rgba(0, 0, 0, 0.14);
        border: 1px solid transparent;
        color: #ffffff;
        
        &:hover {
          background: rgba(0, 0, 0, 0.4);
        }
        
        &:focus,
        &:active {
          border: 1px solid #FFFFFF;
          outline: none;
        }
  `}

  ${({ $isActive }) =>
    $isActive
      ? `
    font-weight: 600;
    border: 1px solid #2D2D3A;
    box-sizing: border-box;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
  `
      : ''}
`;
