import React, { useState, useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import styled from 'styled-components';
import { useAudioRecorder, recordingStatusEnum } from 'common/module/AudioRecorder';
import { seconds2timestring } from 'common/utils/seconds2timestring';
import AudioPlayer from 'admin/components/audio/AudioPlayer';
import ActionButton from 'admin/components/audio/ActionButton';
import SButton from 'admin/components/audio/SButton';
import { useVisualizeRecording } from 'common/module/AudioRecorder';

const STime = styled.div`
  color: ${(props) => props.theme.gray700};
  font-size: 14px;
  line-height: 1.2;
  width: 23%;
  margin-left: 10px;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

interface AudioRecorderProps {
  onRecordChange: (record: Blob | null) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordChange }) => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);
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
    _currentBlob,
    { startRecording, pauseRecording, finishRecording, resetRecording, getVolume }
  ] = useAudioRecorder({ onRecordChange: handleRecordChange });

  useVisualizeRecording(
    status === recordingStatusEnum.RECORDING,
    visualizerRef,
    getVolume
  );

  const handleActionButtonClick = useCallback(() => {
    type tActionMapType = {
      [index in recordingStatusEnum]: () => void;
    };
    const actionMap: tActionMapType = {
      [recordingStatusEnum.EMPTY]: startRecording,
      [recordingStatusEnum.RECORDING]: pauseRecording,
      [recordingStatusEnum.PAUSED]: startRecording,
      [recordingStatusEnum.FINISHED]: () => {}
    };
    actionMap[status]();
  }, [status, startRecording, pauseRecording]);

  const handleDeleteClick = useCallback(() => {
    setAudioSrc(null);
    onRecordChange(null);
    resetRecording();
  }, [resetRecording, setAudioSrc, onRecordChange]);
  return (
    <FlexDiv>
      {getStatusBlock(status, visualizerRef)}

      {status !== recordingStatusEnum.FINISHED && (
        <STime>{seconds2timestring(seconds || 0)}</STime>
      )}
      <div>
        {status !== recordingStatusEnum.FINISHED && (
          <ActionButton status={status} onClick={handleActionButtonClick} />
        )}
        {!(
          status === recordingStatusEnum.FINISHED || status === recordingStatusEnum.EMPTY
        ) && (
          <SButton type="button" onClick={finishRecording}>
            <FontAwesomeIcon icon={faPause} size="sm" />
          </SButton>
        )}
      </div>
      {!!audioSrc && status === recordingStatusEnum.FINISHED && (
        <AudioPlayer src={audioSrc} withDurationFix />
      )}
      {(status === recordingStatusEnum.FINISHED ||
        status === recordingStatusEnum.PAUSED) && (
        <SButton type="button" onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrash} size="sm" />
        </SButton>
      )}
    </FlexDiv>
  );
};
export default AudioRecorder;

const SStatusBlock = styled.div<{
  bg: string;
  colorProp: string;
  width: string;
  height: string;
}>`
  color: ${(props) => props.theme[props.colorProp || 'gray']};
  background: ${(props) => props.theme[props.bg || 'light']};
  font-size: 13px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
function getStatusBlock(
  status: recordingStatusEnum,
  visualizeRef: React.RefObject<HTMLDivElement>
) {
  let color = 'gray';
  let bg = '';
  let width = '0px';
  let height = '0px';
  switch (status) {
    case recordingStatusEnum.EMPTY:
      bg = 'gray200';
      break;
    case recordingStatusEnum.PAUSED:
      bg = 'gray200';
      break;
    case recordingStatusEnum.RECORDING:
      color = 'white';
      bg = 'red';
      width = '66px';
      height = '20px';
      break;
    case recordingStatusEnum.FINISHED:
      bg = 'linguBlue100';
      break;
    default:
      break;
  }

  return (
    <SStatusBlock
      bg={bg}
      colorProp={color}
      ref={visualizeRef}
      width={width}
      height={height}
    />
  );
}
