import { useEffect, useState, useCallback, useRef, useContext } from 'react';
import { Howl, Howler } from 'howler';
import { playSound } from 'students/utils';
import { useTaskAudioPlayer } from 'students/views/shared/bundles/audio/hooks';
import {
  AudioTags,
  tTaskAudioManagerItems
} from 'students/views/shared/bundles/audio/models';

import mp3MatchCorrect from 'students/views/shared/assets/match_correct.mp3';
import mp3MatchIncorrect from 'students/views/shared/assets/match_incorrect.mp3';
import mp3GameBegins from 'students/views/shared/assets/game_begins.mp3';
import { PreferencesContext } from 'students/views/shared/providers/Preferences';

export const playCorrectSound = (): void => {
  playSound(mp3MatchCorrect);
};

export const playIncorrectSound = (): void => {
  playSound(mp3MatchIncorrect);
};

export { playSound };

export const useStartGameMusic = (
  bgMusic: string,
  bgVol = 0.2,
  bgPlayDelay = 0
): void => {
  useEffect(() => {
    const beginSound = new Howl({
      src: [mp3GameBegins]
    });
    beginSound.play();
    const playBgMusic = () => {
      const bgSound = new Howl({
        loop: true,
        src: [bgMusic],
        volume: bgVol
      });
      bgSound.play();
    };
    if (bgPlayDelay > 0) {
      const bgDelayTimer = window.setTimeout(playBgMusic, bgPlayDelay);
      return () => {
        clearTimeout(bgDelayTimer);
        Howler.unload();
      };
    } else {
      playBgMusic();
      return () => {
        Howler.unload();
      };
    }
  }, [bgMusic, bgVol, bgPlayDelay]);
};

export const useContainerDimensions = (
  myRef: React.RefObject<HTMLElement>,
  monitorResize = false
) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current?.offsetWidth || 0,
      height: myRef.current?.offsetHeight || 0
    });
    const handleResize = () => {
      if (myRef.current && monitorResize) setDimensions(getDimensions());
    };
    if (myRef.current) setDimensions(getDimensions());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef, monitorResize]);
  return dimensions;
};

export const useMobileVhHack = () => {
  useEffect(() => {
    const handleResize = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export const useHintVisibility = (
  shouldAppear = true,
  hintTimeout = 5000
): [boolean, () => void] => {
  const lastInteractionTimeRef = useRef(Date.now());
  const updateLastInteractionTime = useCallback(() => {
    setTimePassed(false);
    lastInteractionTimeRef.current = Date.now();
  }, []);
  const [timePassed, setTimePassed] = useState(false);
  const { hintsEffects } = useContext(PreferencesContext);
  const isHintVisible = shouldAppear && hintsEffects && timePassed;

  useEffect(() => {
    if (!(shouldAppear && hintsEffects && lastInteractionTimeRef.current)) return;
    const timer = window.setInterval(() => {
      const interactionTimeout = Date.now() - lastInteractionTimeRef.current;
      if (interactionTimeout > hintTimeout) {
        setTimePassed(true);
        clearInterval(timer);
      }
    }, 500);
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [shouldAppear, hintsEffects, hintTimeout, lastInteractionTimeRef]);

  return [isHintVisible, updateLastInteractionTime];
};

export interface IGameAudioPlayer {
  playIncorrectSound: () => void;
  playCorrectSound: () => void;
}

const defaultAudioItems: tTaskAudioManagerItems = [
  {
    id: 'correct',
    tags: [AudioTags.SoundEffects],
    src: mp3MatchCorrect
  },
  {
    id: 'incorrect',
    tags: [AudioTags.SoundEffects],
    src: mp3MatchIncorrect
  }
];

export function useGameAudioPlayer(
  audioItems: tTaskAudioManagerItems = defaultAudioItems
): IGameAudioPlayer {
  const audioManager = useTaskAudioPlayer(audioItems);

  const playCorrectSound = useCallback(() => {
    audioManager?.playById('correct');
  }, [audioManager]);

  const playIncorrectSound = useCallback(() => {
    audioManager?.playById('incorrect');
  }, [audioManager]);

  return { playCorrectSound, playIncorrectSound };
}
