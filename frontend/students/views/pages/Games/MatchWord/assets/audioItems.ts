import {
  AudioTags,
  tTaskAudioManagerItems
} from 'students/views/shared/bundles/audio/models';

import mp3BgMusic from './bg_music.mp3';

export const audioItems: tTaskAudioManagerItems = [
  {
    id: 'background',
    tags: [AudioTags.MusicPlayback],
    src: mp3BgMusic,
    autoplay: true,
    loop: true,
    volume: 0.2
  }
];
