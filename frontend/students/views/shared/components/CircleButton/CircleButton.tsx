import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { customMediaQuery } from '../../styled';
import UrlIcon from '../UrlIcon';
import ButtonGeneral from '../ButtonGeneral';

export interface ICircle {
  color?: string;
  size?: string;
  bgColor?: string;
  shadowColor?: string;
  disabled?: boolean;
  title?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface ICircleButton extends ICircle {
  children?: React.ReactElement | React.ReactElement[];
  iconUrl?: string;
  iconSize?: string;
  iconColor?: string;
  showSpinner?: boolean;
}

const CircleButton: React.FC<ICircleButton> = ({
  children,
  color,
  size,
  shadowColor,
  onClick,
  disabled,
  bgColor,
  iconUrl,
  iconColor,
  className,
  title,
  showSpinner
}) => (
  <SCircleButton
    size={size}
    shadowColor={shadowColor}
    color={color}
    onClick={onClick}
    bgColor={bgColor}
    disabled={disabled}
    className={cn(className)}
    title={title}
    showSpinner={showSpinner}
  >
    {iconUrl && (
      <SIconWrapper>
        <UrlIcon
          url={iconUrl}
          color={iconColor ? iconColor : '#2D2D3A'}
          width="1em"
          height="1em"
        />
      </SIconWrapper>
    )}
    {children}
  </SCircleButton>
);

export const SCircleButton = styled(ButtonGeneral)<ICircle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 100%;
  box-shadow: 0 4px 0
    ${({ shadowColor }) => (shadowColor ? shadowColor : 'rgba(0, 0, 0, 0.2)')};
  border: none;
  width: ${({ size }) => (size ? size : '6rem')};
  height: ${({ size }) => (size ? size : '6rem')};
  color: ${({ color }) => (color ? color : '#270736')};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : '#ffffff')};
  font-family: 'Inter', ${({ theme }) => theme.linguFontFamily};
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 2.1rem;
  text-transform: uppercase;
  &:hover,
  &:focus,
  &:active {
    color: ${({ color }) => (color ? color : '#262626')};
  }

  &:focus {
    outline: 0;
  }

  ${customMediaQuery('tablet')} {
    width: ${({ size }) => (size ? size : '8.125rem')};
    height: ${({ size }) => (size ? size : '8.125rem')};
    font-size: 1.5rem;
  }
`;

export const SIconWrapper = styled.div`
  width: 100%;
`;

export default CircleButton;
