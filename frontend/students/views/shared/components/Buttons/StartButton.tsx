import React from 'react';
import styled from 'styled-components';
import { Translate, t } from 'i18n';
import { styledFn } from '../../helpers';
import CircleButton from '../CircleButton';
import { ICircleButton } from '../CircleButton/CircleButton';

const StartButton: React.FC<ICircleButton> = (props) => {
  return (
    <SStartButton {...props} title={t('frontend.lesson_task.start_button')}>
      <SButtonText>
        <Translate str="frontend.lesson_task.start_button" />
      </SButtonText>
    </SStartButton>
  );
};

const SStartButton = styled(CircleButton)`
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

const SButtonText = styled.span`
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default StartButton;
