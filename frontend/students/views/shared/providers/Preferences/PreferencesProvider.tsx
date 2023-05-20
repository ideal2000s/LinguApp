import React, { FC, useCallback, useState } from 'react';
import PreferencesContext from './PreferencesContext';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_HIGH_CONTRAST,
  DEFAULT_HINTS_EFFECTS,
  DEFAULT_MUSIC_PLAYBACK,
  DEFAULT_SOUND_EFFECTS
} from './Config';
import { Preferences } from './models';
import { getPreference, setPreference } from './helpers';

const PreferencesProvider: FC = ({ children }) => {
  const [_musicPlayback, _setMusicPlayback] = useState<string>(
    getPreference(Preferences.MusicPlayback, DEFAULT_MUSIC_PLAYBACK)
  );
  const [_soundEffects, _setSoundEffects] = useState<string>(
    getPreference(Preferences.SoundEffects, DEFAULT_SOUND_EFFECTS)
  );
  const [_hintsEffects, _setHintsEffects] = useState<string>(
    getPreference(Preferences.HintsEffects, DEFAULT_HINTS_EFFECTS)
  );
  const [_fontSize, _setFontSize] = useState<string>(
    getPreference(Preferences.FontSize, DEFAULT_FONT_SIZE)
  );
  const [_highContrast, _setHighContrast] = useState<string>(
    getPreference(Preferences.HighContrast, DEFAULT_HIGH_CONTRAST)
  );

  const setMusicPlayback = useCallback((value: boolean) => {
    _setMusicPlayback(setPreference(Preferences.MusicPlayback, value));
  }, []);

  const setSoundEffects = useCallback((value: boolean) => {
    _setSoundEffects(setPreference(Preferences.SoundEffects, value));
  }, []);

  const setHintsEffects = useCallback((value: boolean) => {
    _setHintsEffects(setPreference(Preferences.HintsEffects, value));
  }, []);

  const setFontSize = useCallback((value: number) => {
    _setFontSize(setPreference(Preferences.FontSize, value));
  }, []);

  const setHighContrast = useCallback((value: boolean) => {
    _setHighContrast(setPreference(Preferences.HighContrast, value));
  }, []);

  return (
    <PreferencesContext.Provider
      value={{
        musicPlayback: 'false' !== _musicPlayback,
        soundEffects: 'false' !== _soundEffects,
        hintsEffects: 'false' !== _hintsEffects,
        fontSize: parseInt(_fontSize),
        highContrast: 'false' !== _highContrast,
        setMusicPlayback,
        setSoundEffects,
        setHintsEffects,
        setFontSize,
        setHighContrast
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesProvider;
