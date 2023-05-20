import {
  AudioTags,
  tTaskAudioManagerItems
} from 'students/views/shared/bundles/audio/models';

import mp3BgMusic from './bg_music.mp3';
import mp3MatchCorrect from 'students/views/shared/assets/match_correct.mp3';
import mp3MatchIncorrect from 'students/views/shared/assets/match_incorrect.mp3';

export const audioItems: tTaskAudioManagerItems = [
  {
    id: 'background',
    tags: [AudioTags.MusicPlayback],
    src: mp3BgMusic,
    autoplay: true,
    loop: true,
    volume: 0.2
  },
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
