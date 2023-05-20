import React from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import rightArrowIcon from 'students/views/shared/assets/icons/arrow_right_icon.svg';
import { styledFn } from '../../helpers';
import CircleButton from '../CircleButton';
import { ICircleButton } from '../CircleButton/CircleButton';

const NextButton: React.FC<ICircleButton> = ({
  onClick,
  disabled,
  iconColor,
  shadowColor,
  size,
  bgColor,
  title,
  showSpinner,
  className
}) => {
  return (
    <SNextButton
      onClick={onClick}
      disabled={disabled}
      iconUrl={rightArrowIcon}
      iconColor={iconColor}
      shadowColor={shadowColor}
      size={size}
      bgColor={bgColor}
      title={title}
      showSpinner={showSpinner}
      className={cn(className)}
    />
  );
};

const SNextButton = styled(CircleButton)`
  font-size: 2.5rem;
  &:hover,
  &:focus {
    ${styledFn('background-color', 'linguLightBtnBg.hover')}
    ${styledFn('border-color', 'linguLightBtnBg.hover')}
  }
  &:active {
    ${styledFn('background-color', 'linguLightBtnBg.pressed')}
    ${styledFn('border-color', 'linguLightBtnBg.pressed')}
  }
`;

export default NextButton;
