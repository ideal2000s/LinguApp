import React, {
  useRef,
  useState,
  useCallback,
  BaseSyntheticEvent,
  forwardRef,
  useContext,
  useImperativeHandle
} from 'react';
import styled from 'styled-components';
import DefaultPlayButton from './PlayButton';
import { Translate, I18nContext } from 'i18n';
import { seconds2timestring } from 'common/utils/seconds2timestring';
import { IProps as IPlayButtonProps } from './PlayButton';

type tTimeVariant = 'fulltime' | 'countdown' | 'none';

interface IProps extends Pick<IPlayButtonProps, 'size'> {
  src: string | undefined;
  timeVariant?: tTimeVariant;
  withDurationFix?: boolean;
  className?: string;
  buttonClassName?: string;
  playButtonComponent?: React.FC<IPlayButtonProps>;
  autoplay?: boolean;
}

export type tRef = HTMLMediaElement | null;

const isSafari = !!navigator.userAgent.match(/Version\/(\d+[\d.]+\d)+.*Safari/);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const ForwardedAudioPlayer = forwardRef<tRef, IProps>(function AudioPlayer(
  {
    src,
    withDurationFix,
    className,
    timeVariant,
    buttonClassName,
    playButtonComponent,
    autoplay,
    size
  },
  forwardedRef
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioElement = useRef<tRef>(null);
  // const combinedAudioRef = useCombinedRefs<HTMLMediaElement>(forwardedRef, audioElement);
  useImperativeHandle<tRef, tRef>(forwardedRef, () => audioElement.current);

  useContext(I18nContext);

  function togglePlay(_isPlaying: boolean, audioElement: HTMLMediaElement | null) {
    if (audioElement) {
      _isPlaying
        ? audioElement.play().catch((err) => {
            console.error('playing not allowed', err);
          })
        : audioElement.pause();
    }
  }
  //HANDLERS
  const handleButtonClick = useCallback(() => {
    if (canPlay) {
      const _isPlaying = !audioElement.current?.paused;
      setIsPlaying(!_isPlaying);
      togglePlay(!_isPlaying, audioElement.current);
    } else if (audioElement.current && !isLoading) {
      audioElement.current.load();
      setIsLoading(true);
    }
  }, [canPlay, isLoading]);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleAudioPlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleAudioTimeUpdate = useCallback((e: BaseSyntheticEvent) => {
    setCurrentTime(e.target.currentTime || 0);
  }, []);

  const handleAudioMetaLoaded = useCallback((e: BaseSyntheticEvent) => {
    setDuration(e.target.duration || 0);
  }, []);

  //fix for duration. described here: https://stackoverflow.com/a/52375280
  async function fixDurationCalculation(e: BaseSyntheticEvent) {
    if (e.target && e.target.duration === Infinity) {
      e.persist && e.persist();
      const { target } = e;
      try {
        while (target.duration === Infinity) {
          await new Promise((r) => setTimeout(r, 0));
          target.currentTime = 10000000 * Math.random();
        }
      } catch (error) {
        console.log(error);
      }
      target.currentTime = 0;
      setDuration(target.duration || 0);
    }
    setIsLoading(false);
    setCanPlay(true);
    setHasError(false);
  }
  const handleCanPlayAudio = useCallback(
    async (e: BaseSyntheticEvent) => {
      if (withDurationFix) {
        await fixDurationCalculation(e);
      } else {
        setCanPlay(true);
        setIsLoading(false);
        setHasError(false);
      }
    },
    [withDurationFix]
  );

  const handleError = useCallback((_error) => {
    console.info('AUDIO LOAD ERROR', _error.target.error);
    setHasError(true);
    setCanPlay(false);
    setIsPlaying(false);
    setIsLoading(false);
  }, []);
  // HANDLERS END

  function getTimeToDisplay(): string {
    switch (timeVariant) {
      case 'countdown':
        return `${formatTime(duration - currentTime)}`;
      case 'none':
        return '';
      case 'fulltime':
      default:
        return `${formatTime(currentTime)} / ${formatTime(duration)}`;
    }
  }

  if (!src) return null;

  const timeToDisplay = getTimeToDisplay();
  const PlayButton = playButtonComponent || DefaultPlayButton;

  return (
    <SPlayerDiv className={className}>
      <PlayButton
        className={buttonClassName}
        isPlaying={isPlaying}
        onClick={handleButtonClick}
        hasError={hasError}
        isLoading={isLoading}
        size={size}
      />
      {canPlay && !!timeToDisplay && <SPlayerTime>{timeToDisplay}</SPlayerTime>}
      {hasError && !isLoading && (
        <SMessage>
          <Translate str="frontend.media_player.audio_player.reload_message" />
        </SMessage>
      )}
      <audio
        preload={isSafari && isIOS ? 'none' : 'auto'}
        ref={audioElement}
        onEnded={handleAudioEnded}
        onTimeUpdate={handleAudioTimeUpdate}
        onLoadedMetadata={handleAudioMetaLoaded}
        onCanPlay={handleCanPlayAudio}
        onPlay={handleAudioPlay}
        onError={handleError}
        autoPlay={autoplay}
      >
        <source src={src} />
      </audio>
    </SPlayerDiv>
  );
});

export default ForwardedAudioPlayer;

const SPlayerDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 75%;

  audio {
    visibility: hidden;
  }
`;

const SPlayerTime = styled.span`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.2;
  margin-left: 7px;
`;

const SMessage = styled.span`
  color: #666;
  font-size: 1.1rem;
  margin: 0 10px;
`;

function formatTime(timeInSeconds: number | undefined, ceilSeconds?: boolean) {
  if (timeInSeconds === Infinity) return '-:--';

  return seconds2timestring(timeInSeconds || 0, ceilSeconds);
}
