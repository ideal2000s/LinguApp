import React, { useRef, useCallback, useEffect, useState } from 'react';
import PlayProgressButton from './PlayProgressButton';
import { useAudioPlayer } from 'students/views/shared/bundles/audio/hooks';
import { IEventHandlerOptions } from '../../../bundles/audio/models';

interface IProps {
  src: string;
  color?: string;
  progressColor?: string;
  progressInterval?: number;
  className?: string;
  autoplay?: boolean;
  autoPlayDelay?: number;
  onEnd?: (options: IEventHandlerOptions) => void;
  onAudioStopped?: () => void;
}

const SvgAudioPlayer: React.FC<IProps> = ({
  src,
  color = '#3a3a8a',
  progressColor = '#ffffff',
  progressInterval = 100,
  autoplay,
  autoPlayDelay,
  className,
  onEnd,
  onAudioStopped
}) => {
  const [progress, setProgress] = useState(autoplay ? 0 : 100);
  const didCancel = useRef(false);

  const handleProgress = useCallback((progress: number) => {
    setProgress(progress);
  }, []);

  const handleStop = useCallback(() => {
    if (!didCancel.current) {
      setProgress(100);
      onAudioStopped && onAudioStopped();
    }
  }, [onAudioStopped]);

  useEffect(() => {
    return () => {
      didCancel.current = true;
    };
  }, []);

  const { stop, togglePlay } = useAudioPlayer({
    src,
    preload: true,
    progressInterval,
    autoplay,
    autoPlayDelay,
    onProgress: handleProgress,
    onStop: handleStop,
    onEnd
  });

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const handleTogglePlay = () => {
    togglePlay();
  };

  return (
    <PlayProgressButton
      progress={progress}
      color={color}
      progressColor={progressColor}
      onClick={handleTogglePlay}
      className={className}
    />
  );
};

export default SvgAudioPlayer;
