import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Translate } from 'i18n';
import {
  withLinguModal,
  tWithLinguModalProps
} from 'students/views/shared/components/LinguModal';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import ArrowIcon from 'students/views/shared/assets/icons/back_arrow_icon.svg';
import { SSecondaryButton, customMediaQuery } from 'students/views/shared/styled';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import { ControlsPanel } from './components';

import bgUrl from './bg-bubbles.svg';

interface IExitTaskModal {
  onExit: () => void;
}

const ExitTaskModal: FC<IExitTaskModal & tWithLinguModalProps> = ({ close, onExit }) => {
  const exitClickHandler = () => {
    onExit();
    close && close();
  };

  return (
    <SContainer>
      <GlobalModalStyle />

      <SActionButtonsWrapper>
        <STransparentBtn onClick={close}>
          <UrlIcon url={ArrowIcon} color="#ffffff" height="1rem" width="1rem" />
          <Translate str="frontend.lesson_task.go_back" />
        </STransparentBtn>

        <STransparentBtn onClick={exitClickHandler}>
          <Translate str="frontend.lesson_task.exit_button" />
        </STransparentBtn>
      </SActionButtonsWrapper>

      <SControlsPanelWrapper>
        <ControlsPanel />
      </SControlsPanelWrapper>
    </SContainer>
  );
};

export default withLinguModal('exitTaskModal')(ExitTaskModal);

const GlobalModalStyle = createGlobalStyle`
  * {
    overflow: hidden;
  }

  #app {
    filter: blur(20px);
    /* To remove border glow */
    transform: scale(1.15);
  }
`;

const SContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${bgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SActionButtonsWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  flex: 6;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  ${customMediaQuery('tablet')} {
    max-width: 440px;
    flex: 4;
  }
`;

const SControlsPanelWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const STransparentBtn = styled(SSecondaryButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fbfcff !important;
  width: 100%;
  background: linear-gradient(
    230.5deg,
    rgba(255, 255, 255, 0.3) 3.31%,
    rgba(255, 255, 255, 0.009) 112.7%
  ) !important;
  box-shadow: 0 2px 0 rgba(255, 255, 255, 0.25);
  margin: 0 0 40px;

  ${styleInnerButton()} {
    padding: 12px;

    ${customMediaQuery('tablet')} {
      padding: 17px;
    }
  }

  div:not(.inner) {
    margin-right: 8px;
  }

  &:hover div:not(.inner),
  ${styleInnerButton('focus')} div:not(.inner) {
    transition: background-color 0.15s ease-in-out;
    background-color: ${({ theme }) => theme.linguDarkFont};
  }
`;
