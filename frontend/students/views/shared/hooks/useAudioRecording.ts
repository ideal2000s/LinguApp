import { useRef, useEffect } from 'react';
import { Howl } from 'howler';

interface IUseAudioRecording {
  src?: string | null;
  onPlay?: () => void;
  onError?: (error: any) => void;
  onEnd?: () => void;
  onFinally?: () => void;
}

const useAudioRecording = ({
  src,
  onPlay,
  onError,
  onEnd,
  onFinally
}: IUseAudioRecording): [Howl | null, () => void] => {
  const howlerRef = useRef<Howl | null>(null);

  useEffect(() => {
    if (src) {
      howlerRef.current = new Howl({
        src: [src],
        preload: false
      }).load();
    }
  }, [src, onError]);

  const play = (): void => {
    new Promise((resolve, reject) => {
      try {
        if (howlerRef.current) {
          howlerRef.current.play();

          onPlay && onPlay();

          howlerRef.current.on('end', () => {
            onEnd && onEnd();
            resolve(0);
          });

          howlerRef.current.on('loaderror', (_soundId: number, error: unknown) => {
            reject(error);
          });
        } else {
          onError && onError(new Error('howlerRef is not initialized'));
          reject();
        }
      } catch (e) {
        onError && onError(e);
        reject();
      }
    }).finally(() => {
      onFinally && onFinally();
    });
  };

  return [howlerRef.current, play];
};

export default useAudioRecording;
