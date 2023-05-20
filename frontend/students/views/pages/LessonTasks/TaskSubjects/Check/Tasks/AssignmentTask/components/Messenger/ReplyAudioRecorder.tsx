import React, { FC, useState } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { seconds2timestring } from 'common/utils/seconds2timestring';
import { Translate } from 'i18n';
import { customMediaQuery, SPrimaryButton } from 'students/views/shared/styled';
import { AudioRecorder } from 'common/module/AudioRecorder';

interface IReplyAudioRecorder {
  handleRecordSend: (record: Blob | null) => void;
  minimumRecordingTime: number;
  className?: string;
}

const ReplyAudioRecorder: FC<IReplyAudioRecorder> = ({
  handleRecordSend,
  minimumRecordingTime,
  className
}) => {
  const [showSendButton, setShowSendButton] = useState<boolean>(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);

  const handleOnRecordChange = (record: Blob | null) => {
    if (record) {
      setRecordedAudio(record);
      setShowSendButton(true);
    }
  };

  return (
    <SWrapper className={cn(className)}>
      <SAudioRecorder
        onRecordChange={handleOnRecordChange}
        customOptions={{ height: 60, barMinHeight: 1, normalize: true }}
      />

      {showSendButton ? (
        <SSendBtn onClick={() => handleRecordSend(recordedAudio)}>
          <Translate str="frontend.lesson_task.tasks.check.assignment.send_to_review" />
        </SSendBtn>
      ) : (
        <SMinimumRecordingTime>
          <Translate
            str="frontend.lesson_task.tasks.check.assignment.minimal_recording_time"
            params={{
              minimalRecordingTime: seconds2timestring(minimumRecordingTime)
            }}
          />
        </SMinimumRecordingTime>
      )}
    </SWrapper>
  );
};

export default ReplyAudioRecorder;

const SWrapper = styled.div`
  width: 100%;
  background: rgba(193, 192, 210, 0.5);
  border-radius: 14px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SAudioRecorder = styled(AudioRecorder)``;

const SMinimumRecordingTime = styled.p`
  margin: 60px 0 0;
  padding: 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.125rem;
  color: rgba(94, 93, 113, 0.8);
`;

const SSendBtn = styled(SPrimaryButton)`
  margin: 30px 0 0;
  min-height: 3rem;
  font-size: 1rem;
  transition: background-color 0.3s;
  width: 100%;

  ${customMediaQuery('tablet')} {
    min-height: 3.25rem;
    width: 200px;
  }
`;
