import styled from 'styled-components';
import { styledFn } from 'students/views/shared/helpers';
import ButtonGeneral from '../components/ButtonGeneral';
import { styleInnerButton } from '../components/ButtonGeneral/ButtonGeneral';

export const SButton = styled(ButtonGeneral)`
  min-height: 3.75rem;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 2.25rem;
  border-radius: 10px;
  margin-top: 1rem;
  margin-bottom: 1rem;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    font-size: 1.375rem;
    min-height: 4rem;
  }
`;

export const SPrimaryButton = styled(SButton)`
  ${styledFn('background-color', 'linguPrimarySubmitBtnBg.default')}
  &:hover,
  ${styleInnerButton('focus')} {
    ${styledFn('background-color', 'linguPrimarySubmitBtnBg.hover')}
  }

  &:active {
    ${styledFn('background-color', 'linguPrimarySubmitBtnBg.pressed')}
  }

  &:disabled {
    ${styledFn('background-color', 'linguPrimarySubmitBtnBg.disabled')}
    border: 0;
  }
`;

export const SSecondaryButton = styled(SButton)`
  ${styledFn('background-color', 'linguSecondaryBtnBg.default')}
  display: block;

  &,
  &:hover,
  ${styleInnerButton('focus')}, &:active,
  &:disabled {
    color: ${({ theme }) => theme.linguDarkFont} !important;
    ${styledFn('border-color', 'linguSecondaryBtnBg.default')}
    box-shadow: none !important;
    border: none;
  }

  &:hover,
  ${styleInnerButton('focus')} {
    ${styledFn('background-color', 'linguSecondaryBtnBg.hover')}
  }

  &:active,
  &:pressed {
    ${styledFn('background-color', 'linguSecondaryBtnBg.pressed')}
  }

  &:disabled {
    ${styledFn('background-color', 'linguSecondaryBtnBg.disabled')}
  }
`;

export const SLightButton = styled(SButton)`
  ${styledFn('background-color', 'linguLightBtnBg.default')}
  ${styledFn('border-color', 'linguLightBtnBg.default')}
  &:hover,
  ${styleInnerButton('focus')} {
    ${styledFn('background-color', 'linguLightBtnBg.hover')}
    ${styledFn('border-color', 'linguLightBtnBg.hover')}
  }

  &:active {
    ${styledFn('background-color', 'linguLightBtnBg.pressed')}
    ${styledFn('border-color', 'linguLightBtnBg.pressed')}
  }

  &:disabled {
    ${styledFn('background-color', 'linguLightBtnBg.disabled')}
    ${styledFn('border-color', 'linguLightBtnBg.disabled')}
    border: 0;
  }
`;

export const STransparentButton = styled(SButton)`
  ${styledFn('background-color', 'linguTransparentBtnBg.default')}
  ${styledFn('border-color', 'linguTransparentBtnBg.default')}
  border: 2px solid transparent;
  border-color: transparent !important;
  &:hover {
    ${styledFn('background-color', 'linguTransparentBtnBg.hover')}
    ${styledFn('border-color', 'linguTransparentBtnBg.hover')}
  }

  ${styleInnerButton('focus')} {
    ${styledFn('background-color', 'linguTransparentBtnBg.focus')}
    ${styledFn('border-color', 'linguBlue400')}
    border-width: 2px;
    border-style: solid;
  }

  &:active {
    ${styledFn('background-color', 'linguTransparentBtnBg.pressed')}
    ${styledFn('border-color', 'linguTransparentBtnBg.pressed')}
  }

  &:disabled {
    ${styledFn('background-color', 'linguTransparentBtnBg.disabled')}
    ${styledFn('border-color', 'linguTransparentBtnBg.disabled')}
    border: 0;
    opacity: 0.2;
  }
`;

export const SYellowButton = styled(SButton)`
  color: #00466f;
  ${styledFn('background-color', 'linguYellowBtnBg.default')}
  ${styledFn('border-color', 'linguYellowBtnBg.default')}
  &:hover {
    color: #00466f;
    ${styledFn('background-color', 'linguYellowBtnBg.hover')}
    ${styledFn('border-color', 'linguYellowBtnBg.hover')}
  }

  ${styleInnerButton('focus')} {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
      #d7df21;
  }

  &:active {
    color: #00466f;
    ${styledFn('background-color', 'linguYellowBtnBg.pressed')}
    ${styledFn('border-color', 'linguYellowBtnBg.pressed')}
  }

  &:disabled {
    color: #00466f;
    ${styledFn('background-color', 'linguYellowBtnBg.disabled')}
    ${styledFn('border-color', 'linguYellowBtnBg.disabled')}
    border: 0;
  }
`;

export const SNoStyleButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  border: 0;

  &:hover,
  &:focus,
  &:active,
  &:disabled {
    background-color: transparent;
    border-color: transparent;
    border: 0;
  }
`;
