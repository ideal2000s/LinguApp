import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer, { WaveSurferParams } from 'wavesurfer.js';
import styled from 'styled-components';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons/faPlayCircle';
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons/faPauseCircle';
import DownloadIcon from '../assets/download.svg';
import { seconds2timestring } from '../utils/seconds2timestring';

interface IProps {
  url: string;
  size: number;
  customOptions?: WaveSurferParams;
  isDownloadable: boolean;
  id: string;
  className?: string;
}

enum AudioState {
  Initial,
  Playing,
  Pausing
}

const WaveAudioPlayer: React.FC<IProps> = ({
  url,
  size,
  isDownloadable = true,
  customOptions,
  id,
  className
}) => {
  const [state, setState] = useState<AudioState>(AudioState.Initial);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const waveform = useRef<WaveSurfer | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    waveform.current = WaveSurfer.create({
      barWidth: 1,
      barGap: 2,
      minPxPerSec: 100,
      cursorWidth: 1,
      container: `#waveform_${id}`,
      height: 60,
      partialRender: true,
      progressColor: '#00A5D7',
      waveColor: '#807F91',
      cursorColor: 'transparent',
      ...customOptions
    });
    waveform.current.load(url);
    waveform.current.on('ready', function () {
      waveform.current && setDuration(waveform.current.getDuration());
    });
    waveform.current.on('seek', function () {
      setState(AudioState.Pausing);
      waveform.current && setCurrentTime(waveform.current.getCurrentTime());
    });
    waveform.current.on('finish', function () {
      setState(AudioState.Pausing);
    });

    return () => {
      waveform.current && waveform.current.destroy();
    };
  }, [url, id, customOptions]);

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

  return (
    <SWaveformContainer className={cn(className)}>
      <SFontAwesomeIcon
        className="playing-btn-svg"
        icon={
          state === AudioState.Initial || state === AudioState.Pausing
            ? faPlayCircle
            : faPauseCircle
        }
        color="#009ee2"
        onClick={handlePlay}
      />
      <SWave id={`waveform_${id}`} />
      {state === AudioState.Initial ? (
        <STimeContainer>
          {seconds2timestring(duration)}
          <SAudioSize>{`${size} MB`}</SAudioSize>
        </STimeContainer>
      ) : (
        <STimeContainer>
          {`${seconds2timestring(currentTime)} / ${seconds2timestring(duration)}`}
        </STimeContainer>
      )}
      {isDownloadable && (
        <SAudioLinkContainer>
          <a aria-label="Download" href={url}>
            <img src={DownloadIcon} alt="download" />
          </a>
        </SAudioLinkContainer>
      )}
    </SWaveformContainer>
  );
};

export default WaveAudioPlayer;

const SWave = styled.div`
  width: 100%;
  height: 30px;
  margin-top: -30px;
  overflow: hidden;
`;

const SWaveformContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 60px;
  width: 372px;
  background: rgba(240, 240, 243, 0.5);
  border-radius: 6px;
`;

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 38px !important;
  height: 38px;
  margin-left: 14px;
  margin-right: 8px;
  cursor: pointer;
`;

const STimeContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 65px;
  font-size: 12px;
  line-height: 14px;
  color: #807f91;
`;

const SAudioSize = styled.span`
  margin-left: 8px;
`;

const SAudioLinkContainer = styled.div`
  width: 44px;
  height: 32px;
  background: #00a5d7;
  background: rgba(0, 165, 215, 0.1);
  border-radius: 4px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
