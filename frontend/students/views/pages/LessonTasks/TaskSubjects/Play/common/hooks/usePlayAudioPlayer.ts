import { useCallback } from 'react';
import { useTaskAudioPlayer } from 'students/views/shared/bundles/audio/hooks';

import startSound from '../../common/assets/game_begins.mp3';
import finishSound from '../../common/assets/game_finish.mp3';
import correctSound from '../../common/assets/match_correct.mp3';
import incorrectSound from '../../common/assets/match_incorrect.mp3';
import {
  AudioTags,
  tTaskAudioManagerItems
} from 'students/views/shared/bundles/audio/models';

const audioItems: tTaskAudioManagerItems = [
  {
    id: 'correct',
    tags: [AudioTags.SoundEffects],
    src: correctSound
  },
  {
    id: 'incorrect',
    tags: [AudioTags.SoundEffects],
    src: incorrectSound
  },
  {
    id: 'start',
    tags: [AudioTags.SoundEffects],
    src: startSound
  },
  {
    id: 'finish',
    tags: [AudioTags.SoundEffects],
    src: finishSound
  }
];

interface IReturnedObject {
  playIncorrectSound: () => void;
  playCorrectSound: () => void;
  playStartSound: () => void;
  playFinishSound: () => void;
  playSound: (id: string | number) => void;
}

export default function usePlayAudioPlayer(): IReturnedObject {
  const audioManager = useTaskAudioPlayer(audioItems);

  const playSound = useCallback(
    (id: string | number) => {
      audioManager?.playById(id);
    },
    [audioManager]
  );

  const playCorrectSound = useCallback(() => {
    playSound('correct');
  }, [playSound]);

  const playIncorrectSound = useCallback(() => {
    playSound('incorrect');
  }, [playSound]);

  const playStartSound = useCallback(() => {
    playSound('start');
  }, [playSound]);

  const playFinishSound = useCallback(() => {
    playSound('finish');
  }, [playSound]);

  return {
    playCorrectSound,
    playIncorrectSound,
    playStartSound,
    playFinishSound,
    playSound
  };
}
