import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone';
import { recordingStatusEnum } from 'common/module/AudioRecorder';
import SButton from 'admin/components/audio/SButton';

function getStatusBGColor(props: { status: recordingStatusEnum; theme: any }) {
  return props.status === recordingStatusEnum.RECORDING ? 'white' : '#e63757';
}
function getStatusColor(props: { status: recordingStatusEnum }) {
  return props.status === recordingStatusEnum.RECORDING ? '#e63757' : 'white';
}

const SActionButton = styled(SButton)<{ status: recordingStatusEnum }>`
  border: 2px solid #e63757;
  border-radius: 1.5rem;
  background: ${getStatusBGColor};
  color: ${getStatusColor};
  width: 4.7rem !important;
  height: 2.3rem !important;
  font-size: 1.3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const RecordSpan = styled.span`
  margin-left: 0 !important;
  font-size: 1rem !important;
`;

const RecordBtn = (
  <React.Fragment>
    <FontAwesomeIcon icon={faMicrophone} size="sm" />
    <RecordSpan>start</RecordSpan>
  </React.Fragment>
);

const ContinueBtn = <FontAwesomeIcon icon={faMicrophone} size="sm" />;

interface ActionButtonProps {
  status: recordingStatusEnum;
  onClick?: (e: SyntheticEvent) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ status, onClick }) => {
  let btnInner = null;

  switch (status) {
    case recordingStatusEnum.EMPTY:
    case recordingStatusEnum.FINISHED:
      btnInner = RecordBtn;
      break;
    case recordingStatusEnum.RECORDING:
      btnInner = '';
      break;
    case recordingStatusEnum.PAUSED:
      btnInner = ContinueBtn;
      break;
    default:
      break;
  }
  if (!btnInner) return null;

  return (
    <SActionButton type="button" status={status} onClick={onClick}>
      {btnInner}
    </SActionButton>
  );
};
export default ActionButton;
