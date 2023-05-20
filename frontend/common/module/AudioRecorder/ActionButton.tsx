import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { recordingStatusEnum } from './useAudioRecorder';
import MicrophoneIcon from '../../assets/microphone.svg';
import FinishIcon from '../../assets/finish.svg';
import PlayIcon from '../../assets/play.svg';
import PauseIcon from '../../assets/pause.svg';
import { AudioState } from './AudioRecorder';

interface ActionButtonProps {
  status: recordingStatusEnum;
  audioPlayStatus: AudioState;
  onClick?: (e: SyntheticEvent) => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  status,
  audioPlayStatus,
  onClick
}) => {
  let btnInner = null;

  const finishBtn = (
    <SFinishDiv status={status}>
      <SFinishImg src={FinishIcon} alt="pause" />
    </SFinishDiv>
  );

  const playBtn = (
    <SRecordDiv>
      <img
        src={audioPlayStatus === AudioState.Playing ? PauseIcon : PlayIcon}
        alt="play/pause"
      />
    </SRecordDiv>
  );

  switch (status) {
    case recordingStatusEnum.EMPTY:
      btnInner = recordBtn;
      break;
    case recordingStatusEnum.FINISHED:
      btnInner = playBtn;
      break;
    case recordingStatusEnum.RECORDING:
    case recordingStatusEnum.PAUSED:
      btnInner = finishBtn;
      break;
    default:
      break;
  }
  if (!btnInner) return null;

  return (
    <SActionButtonContainer status={status} onClick={onClick}>
      {btnInner}
    </SActionButtonContainer>
  );
};

const SActionButtonContainer = styled.div<{ status: recordingStatusEnum }>`
  cursor: pointer;
`;

const SRecordDiv = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%);
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:active {
    box-shadow: none;
  }
`;

const recordBtn = (
  <SRecordDiv>
    <img src={MicrophoneIcon} alt="microphone" />
  </SRecordDiv>
);

const SFinishDiv = styled.div<{ status: recordingStatusEnum }>`
  width: 56px;
  height: 56px;
  background: #ff5858;
  border-radius: 50%;
  position: relative;
  ${(props) =>
    props.status === recordingStatusEnum.RECORDING &&
    `
    animation: pulseDot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite;
    &:before {
      animation: pulseRing 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      background-color: #FF5858;
      border-radius: 50%;
      content: '';
      display: block;
      width: 83px;
      height: 83px;
      left: -13px;
      position: relative;
      top: -13px;
    }
    @keyframes pulseRing {
      0% { transform: scale(0.3); }
      80%, 100% { opacity: 0; }
    }
    @keyframes pulseDot {
      0%, 100% { transform: scale(1); }
    }
  `}
`;

const SFinishImg = styled.img`
  position: absolute;
  top: 18px;
  left: 18px;
`;
