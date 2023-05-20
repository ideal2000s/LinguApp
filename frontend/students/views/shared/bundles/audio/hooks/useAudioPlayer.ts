import { useCallback, useEffect, useState } from 'react';
import { IAudioPlayer, IAudioPlayerOptions, IEventHandlerOptions } from '../models';
import { HowlAudioPlayer } from '../classes';

interface IReturnedObject {
  play: () => void;
  stop: () => void;
  togglePlay: () => void;
}

export default function useAudioPlayer({
  src,
  preload,
  progressInterval,
  autoplay,
  autoPlayDelay,
  loop,
  volume,
  onProgress,
  onEnd,
  onError,
  onFade,
  onLoad,
  onMute,
  onPause,
  onPlay,
  onRate,
  onSeek,
  onStop,
  onUnlock,
  onVolume
}: IAudioPlayerOptions): IReturnedObject {
  const [player, setPlayer] = useState<IAudioPlayer | null>(null);

  const play = useCallback(() => {
    player?.play();
  }, [player]);

  const stop = useCallback(() => {
    player?.stop();
  }, [player]);

  const togglePlay = useCallback(() => {
    if (player?.playing()) {
      player.stop();
    } else {
      player?.play();
    }
  }, [player]);

  useEffect(() => {
    let player: IAudioPlayer | null = null;
    try {
      const handlePlay = (options: IEventHandlerOptions) => {
        onPlay?.(options);
      };
      player = new HowlAudioPlayer({
        src,
        preload,
        progressInterval,
        autoplay: autoplay && !autoPlayDelay,
        loop,
        volume,
        onProgress,
        onEnd,
        onError,
        onFade,
        onLoad,
        onMute,
        onPause,
        onPlay: handlePlay,
        onRate,
        onSeek,
        onStop,
        onUnlock,
        onVolume
      });

      // Configure delay for autoplaying
      if (autoPlayDelay && autoPlayDelay > 0) {
        setTimeout(() => {
          player?.play();
        }, autoPlayDelay);
      }
    } catch (e) {
      onError && onError(e.message);
    }

    setPlayer(player);

    return () => {
      player?.unload();
    };
  }, [
    src,
    progressInterval,
    autoplay,
    autoPlayDelay,
    preload,
    loop,
    volume,
    onEnd,
    onError,
    onFade,
    onLoad,
    onMute,
    onPause,
    onPlay,
    onProgress,
    onRate,
    onSeek,
    onStop,
    onUnlock,
    onVolume
  ]);

  return { play, stop, togglePlay };
}
