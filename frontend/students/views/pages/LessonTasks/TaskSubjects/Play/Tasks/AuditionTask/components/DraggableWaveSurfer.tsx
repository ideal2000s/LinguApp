import React, { useRef, useEffect, useCallback } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import WaveSurfer from 'wavesurfer.js';

import pointerSvg from '../assets/wordPointer.svg';

interface IProps {
  url: string;
  autoplay?: boolean;
  height?: number;
  from?: number;
  to?: number;
  onPause: () => void;
}

const MIN_PX_PER_SEC = 20;

const DraggableWaveSurfer: React.FC<IProps> = ({
  url,
  height = 200,
  autoplay = true,
  from = 0,
  to = 0,
  onPause
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const isDragging = useRef(false);
  const controls = useAnimation();

  const handleAudioProcess = useCallback(() => {
    if (wavesurfer.current && !isDragging.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      controls.start({ x: -currentTime * MIN_PX_PER_SEC });
      if (to && currentTime >= to) {
        wavesurfer.current.pause();
        onPause();
      }
    }
  }, [controls, to, onPause]);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgba(255, 255, 255, 0.2)',
        progressColor: '#FFFFFF',
        barWidth: 3,
        barMinHeight: 1,
        barRadius: 3,
        cursorWidth: 0,
        height: height,
        barGap: 5,
        fillParent: false,
        interact: false,
        minPxPerSec: MIN_PX_PER_SEC
      });
      if (autoplay) {
        wavesurfer.current.on('ready', () => wavesurfer.current?.play());
      }
      wavesurfer.current.load(url);
    }
    return () => {
      wavesurfer.current?.destroy();
    };
  }, [waveformRef, autoplay, height, url]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.on('audioprocess', handleAudioProcess);
      if (!wavesurfer.current.isPlaying()) wavesurfer.current.play();
    }
    return () => {
      wavesurfer.current?.un('audioprocess', handleAudioProcess);
    };
  }, [handleAudioProcess]);

  const handleDragStart = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    _info: PanInfo
  ) => {
    isDragging.current = true;
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      const offsetInSec = -info.offset.x / MIN_PX_PER_SEC;
      if (from && currentTime + offsetInSec < from) {
        wavesurfer.current.skip(from - currentTime);
      } else if (to && currentTime + offsetInSec > to) {
        wavesurfer.current.skip(to - currentTime);
      } else {
        wavesurfer.current.skip(offsetInSec);
      }

      if (wavesurfer.current.getCurrentTime() < wavesurfer.current.getDuration()) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
        isDragging.current = false;
        handleAudioProcess();
      }
    }
    isDragging.current = false;
  };

  return (
    <SContainer $height={height}>
      <SWaveform
        drag={wavesurfer.current ? 'x' : false}
        dragMomentum={false}
        as={motion.div}
        animate={controls}
        ref={waveformRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    </SContainer>
  );
};

export default DraggableWaveSurfer;

const SContainer = styled.div<{ $height: number }>`
  overflow: hidden;
  position: relative;
  height: ${({ $height }) => $height}px;
`;

const SWaveform = styled.div`
  position: absolute;
  left: 50%;
  cursor: url(${pointerSvg}), pointer;
`;
