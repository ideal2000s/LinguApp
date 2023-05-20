import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import WaveSurfer from 'wavesurfer.js';
import { seconds2timestring } from 'common/utils/seconds2timestring';
import { recordingStatusEnum, useAudioRecorder } from './useAudioRecorder';
import { ActionButton } from './ActionButton';
import BlackPauseIcon from 'common/assets/pause_black.svg';
import WhitePauseIcon from 'common/assets/pause_white.svg';
import BxMicroIcon from 'common/assets/bx_microphone.svg';

interface IAudioRecorderProps {
  onRecordChange: (record: Blob | null) => void;
  customOptions?: any;
}

export enum AudioState {
  Initial,
  Playing,
  Pausing
}

export const AudioRecorder: React.FC<IAudioRecorderProps> = ({
  onRecordChange,
  customOptions
}) => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [state, setState] = useState<AudioState>(AudioState.Initial);
  const [currentTime, setCurrentTime] = useState(0);
  const waveform = useRef<WaveSurfer | null>(null);
  const intervalRef = useRef<number | null>(null);

  const handleRecordChange = useCallback(
    (srs: string | any, audioBlob: Blob | any) => {
      setAudioSrc(srs);
      onRecordChange(audioBlob);
    },
    [onRecordChange]
  );
  const [
    status,
    seconds,
    currentBlob,
    { startRecording, pauseRecording, finishRecording, resetRecording }
  ] = useAudioRecorder({ onRecordChange: handleRecordChange });

  useEffect(() => {
    if (audioSrc) {
      waveform.current = WaveSurfer.create({
        barWidth: 1,
        barGap: 2,
        minPxPerSec: 100,
        cursorWidth: 1,
        container: '#recordwaveform',
        height: 60,
        partialRender: true,
        progressColor: '#00A5D7',
        waveColor: '#807F91',
        cursorColor: 'transparent',
        ...customOptions
      });
    } else {
      waveform.current && waveform.current.destroy();
      setState(AudioState.Initial);
      setCurrentTime(0);
    }
    !!audioSrc &&
      waveform.current &&
      waveform.current.load(URL.createObjectURL(currentBlob));
    waveform.current &&
      waveform.current.on('seek', function () {
        setState(AudioState.Pausing);
        waveform.current && setCurrentTime(waveform.current.getCurrentTime());
      });
    waveform.current &&
      waveform.current.on('finish', function () {
        setState(AudioState.Pausing);
      });

    return () => {
      waveform.current && waveform.current.destroy();
    };
  }, [audioSrc, currentBlob, customOptions]);

  useEffect(() => {
    if (state === AudioState.Playing) {
      intervalRef.current = window.setInterval(() => {
        if (waveform.current) setCurrentTime(waveform.current.getCurrentTime());
      }, 1000);
    } else {
      intervalRef?.current && clearInterval(intervalRef.current);
    }

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [state]);

  const handleActionButtonClick = useCallback(() => {
    const handlePlay = () => {
      if (waveform.current) {
        waveform.current.playPause();
        switch (state) {
          case AudioState.Initial: {
            setState(AudioState.Playing);
            break;
          }
          case AudioState.Playing: {
            setState(AudioState.Pausing);
            break;
          }
          case AudioState.Pausing: {
            setState(AudioState.Playing);
            break;
          }
        }
      }
    };

    type tActionMapType = {
      [index in recordingStatusEnum]: () => void;
    };
    const actionMap: tActionMapType = {
      [recordingStatusEnum.EMPTY]: startRecording,
      [recordingStatusEnum.RECORDING]: finishRecording,
      [recordingStatusEnum.PAUSED]: finishRecording,
      [recordingStatusEnum.FINISHED]: handlePlay
    };
    actionMap[status]();
  }, [status, startRecording, finishRecording, state]);

  const handleDeleteClick = useCallback(() => {
    setAudioSrc(null);
    onRecordChange(null);
    resetRecording();
  }, [resetRecording, setAudioSrc, onRecordChange]);

  const pauseBtn = (
    <SPauseDiv
      status={status}
      onClick={status === recordingStatusEnum.RECORDING ? pauseRecording : startRecording}
    >
      <SPauseImg
        src={status === recordingStatusEnum.RECORDING ? BlackPauseIcon : WhitePauseIcon}
        alt="pause/resume"
      />
    </SPauseDiv>
  );

  const resetBtn = (
    <SDeleteDiv onClick={handleDeleteClick}>
      <img src={BxMicroIcon} alt="microphone" />
    </SDeleteDiv>
  );

  return (
    <SFlexColumnDiv>
      <SWaveformContainer>
        <SWave id="recordwaveform" />
      </SWaveformContainer>
      {status === recordingStatusEnum.EMPTY && (
        <SRecordInstruction>Press on button to start recording</SRecordInstruction>
      )}
      <SRecordingStatus>
        {status === recordingStatusEnum.RECORDING && <SRecordingDot />}
        {status !== recordingStatusEnum.EMPTY && state === AudioState.Initial && (
          <STime status={status}>{seconds2timestring(seconds || 0)}</STime>
        )}
        {status === recordingStatusEnum.FINISHED && state !== AudioState.Initial && (
          <STime status={status}>{seconds2timestring(currentTime)}</STime>
        )}
      </SRecordingStatus>
      <SRecordBtnGroup status={status}>
        <ActionButton
          status={status}
          audioPlayStatus={state}
          onClick={handleActionButtonClick}
        />
        {!(
          status === recordingStatusEnum.FINISHED || status === recordingStatusEnum.EMPTY
        ) && pauseBtn}
        {status == recordingStatusEnum.FINISHED && resetBtn}
      </SRecordBtnGroup>
    </SFlexColumnDiv>
  );
};

const STime = styled.div<{ status: recordingStatusEnum }>`
  color: #5e5d71;
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  ${(props) =>
    props.status === recordingStatusEnum.RECORDING &&
    `
    margin-left: 20px;
  `}
`;

const SFlexColumnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SRecordingStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;
  position: relative;
`;

const SRecordInstruction = styled.div`
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  color: #807f91;
  margin-bottom: 22px;
  margin-top: -20px;
`;

const SRecordingDot = styled.span`
  width: 8px;
  height: 8px;
  background: #ff5858;
  border-radius: 50%;
  position: absolute;
  left: 10px;
`;

const SPauseDiv = styled.div<{ status: recordingStatusEnum }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  margin-left: 20px;
  cursor: pointer;
  ${(props) =>
    props.status === recordingStatusEnum.RECORDING
      ? `
    background: rgba(94, 93, 113, 0.12);
  `
      : `
    background: rgb(94, 93, 113);
    opacity: 0.5;
    animation: pulseDot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite;
    &:before {
      animation: pulseRing 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      background-color: #5E5D71;
      border-radius: 50%;
      content: '';
      display: block;
      width: 70px;
      height: 70px;
      left: -15px;
      position: relative;
      top: -15px;
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

const SPauseImg = styled.img`
  position: absolute;
  top: 12px;
  left: 12px;
`;

const SDeleteDiv = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(94, 93, 113, 0.12);
  border-radius: 50%;
  margin-left: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SWaveformContainer = styled.div`
  position: relative;
  height: 60px;
  width: 320px;
  margin-top: 20px;
  margin-bottom: -15px;
`;

const SWave = styled.div`
  width: 100%;
  height: 30px;
  overflow: hidden;
`;

const SRecordBtnGroup = styled.div<{ status: recordingStatusEnum }>`
  display: flex;
  align-items: center;
  ${(props) =>
    props.status !== recordingStatusEnum.EMPTY &&
    `
    margin-left: 60px;
  `}
`;
