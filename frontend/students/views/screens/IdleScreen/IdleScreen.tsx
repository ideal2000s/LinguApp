import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { t } from 'i18n-js';
import { Translate } from 'i18n';
import {
  useHeartBeatChangeOptions,
  useHeartBeatContextApi
} from 'students/views/shared/components/HeartBeat';
import {
  SSecondaryButton,
  SRootStyle,
  SYellowButton
} from 'students/views/shared/styled';
import bgUrl from './bg-bubbles.svg';
import { ILesson } from 'students/models';
import LessonCard from './LessonCard';

export interface IProps {
  lesson: ILesson | null;
  onExit?: () => void;
}
const IdleScreen: React.FC<IProps> = ({ lesson, onExit }) => {
  const [show, setShow] = useState(false);
  const hideModal = useCallback(() => {
    setShow(false);
  }, [setShow]);
  const newOptions = useMemo(
    () => ({
      onIdle: () => {
        setShow(true);
      }
    }),
    []
  );

  useHeartBeatChangeOptions(newOptions);
  const heartBeatContext = useHeartBeatContextApi();

  const handleContinue = () => {
    heartBeatContext?.reset();
    hideModal();
  };

  const exitButtonClickHandler = () => {
    heartBeatContext?.reset();
    hideModal();
    onExit && onExit();
  };

  return (
    <SModal show={show} onHide={hideModal} dialogClassName="100w 100h m-0">
      <SRootStyle>
        <Modal.Body>
          <SIdleBody>
            <SMessage>
              <Translate str="frontend.idle_screen.idle_message" />
            </SMessage>

            <SStyledLessonCard lesson={lesson} />
            <SButtonsBlock>
              <SContinueButton
                title={t('frontend.idle_screen.continue_lesson')}
                onClick={handleContinue}
              >
                <Translate str="frontend.idle_screen.continue_lesson" />
              </SContinueButton>
              <SExitButton
                title={t('frontend.idle_screen.exit')}
                onClick={exitButtonClickHandler}
              >
                <Translate str="frontend.idle_screen.exit" />
              </SExitButton>
            </SButtonsBlock>
          </SIdleBody>
        </Modal.Body>
      </SRootStyle>
    </SModal>
  );
};

export default IdleScreen;

const SModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: 0;

    background: linear-gradient(180deg, #6944afee 0%, #453780ee 100%);
    color: #fbfcff;
  }

  .modal-dialog,
  .modal-body {
    max-width: 100vw;
    min-width: 100vw;

    max-height: 100vh;
    min-height: 100vh;
    overflow: scroll;
    display: flex;
  }

  .modal-body {
    justify-content: center;
    @media (min-width: ${({ theme }) => theme.linguBptMd}) {
      background: url(${bgUrl});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
`;

const SIdleBody = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  max-width: 500px;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    justify-content: center;
  }

  .btn {
    width: 100%;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    margin: 10px 0 !important;

    @media (min-width: ${({ theme }) => theme.linguBptMd}) {
      width: auto;
      min-width: 436px;
      font-size: 22px;
      line-height: 27px;
      margin: 20px 0 !important;
    }
  }
`;

const SMessage = styled.h3`
  font-family: ${({ theme }) => theme.linguHeadingFontFamily};
  font-style: normal;
  font-weight: 600;
  font-size: 1.875rem;
  line-height: 28px;

  text-align: center;
`;

const SButtonsBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const SContinueButton = styled(SYellowButton)``;

const SExitButton = styled(SSecondaryButton)`
  color: #fbfcff !important;
  background: linear-gradient(
    230.5deg,
    rgba(255, 255, 255, 0.3) 3.31%,
    rgba(255, 255, 255, 0.009) 112.7%
  ) !important;
  box-shadow: 0px 2px 0px rgba(255, 255, 255, 0.25);
`;

const SStyledLessonCard = styled(LessonCard)`
  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    margin: 50px 0 74px;
  }
`;
