import React from 'react';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_HIGH_CONTRAST,
  DEFAULT_HINTS_EFFECTS,
  DEFAULT_MUSIC_PLAYBACK,
  DEFAULT_SOUND_EFFECTS
} from './Config';

const PreferencesContext = React.createContext({
  musicPlayback: DEFAULT_MUSIC_PLAYBACK,
  setMusicPlayback: (_value: boolean) =>
    console.log('setMusicPlayback handler should be defined'),

  soundEffects: DEFAULT_SOUND_EFFECTS,
  setSoundEffects: (_value: boolean) =>
    console.log('setSoundEffects handler should be defined'),

  hintsEffects: DEFAULT_HINTS_EFFECTS,
  setHintsEffects: (_value: boolean) =>
    console.log('setHintsEffects handler should be defined'),

  fontSize: DEFAULT_FONT_SIZE,
  setFontSize: (_value: number) => console.log('setFontSize handler should be defined'),

  highContrast: DEFAULT_HIGH_CONTRAST,
  setHighContrast: (_value: boolean) =>
    console.log('setHighContrast handler should be defined')
});

export default PreferencesContext;
