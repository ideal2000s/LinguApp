import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { WaveSurferParams } from 'wavesurfer.js';
import { customMediaQuery } from 'students/views/shared/styled';
import WaveAudioPlayer from 'school/components/WaveAudioPlayer';

interface IAudioMessage {
  audioURL: string;
  audioSize: number;
  className?: string;
  id: string;
}

const AudioMessage: FC<IAudioMessage> = ({ audioURL, audioSize, className, id }) => (
  <SWrapper className={cn(className)}>
    <SWaveAudioPlayer
      id={`waveAudioPlayer_${id}`}
      url={audioURL}
      size={audioSize}
      isDownloadable={false}
      customOptions={{ waveColor: 'rgb(172, 172, 183)' } as WaveSurferParams}
    />
  </SWrapper>
);

export default AudioMessage;

const SWrapper = styled.div`
  width: 100%;
`;

const SWaveAudioPlayer = styled(WaveAudioPlayer)`
  background: linear-gradient(180deg, #ffffff -75.34%, rgba(255, 255, 255, 0.8) 100%);
  border-radius: 10px;
  padding: 12px;
  height: 72px;

  & > svg {
    margin-left: 0;
  }

  ${customMediaQuery('tablet')} {
    padding: 16px;
    width: 100%;
  }
`;
