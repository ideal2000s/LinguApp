import { useEffect, useCallback, useState } from 'react';
import { useHeartBeatContextApi } from '.';

export default function useHeartBeatMediaControl(): {
  onStopPlaying: () => void;
  onStartPlaying: () => void;
} {
  const [isPlaying, setIsPlaying] = useState(false);
  const heartBeatContext = useHeartBeatContextApi();

  useEffect(() => {
    if (isPlaying) {
      heartBeatContext?.pause();
    } else {
      heartBeatContext?.reset();
    }
  }, [heartBeatContext, isPlaying]);

  const onStopPlaying = useCallback(() => {
    setIsPlaying(false);
  }, [setIsPlaying]);

  const onStartPlaying = useCallback(() => {
    setIsPlaying(true);
  }, [setIsPlaying]);

  return { onStopPlaying, onStartPlaying };
}
