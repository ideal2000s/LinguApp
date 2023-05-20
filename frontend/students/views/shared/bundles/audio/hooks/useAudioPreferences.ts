import { useCallback, useContext } from 'react';
import { PreferencesContext } from 'students/views/shared/providers/Preferences';
import { AudioTags, tTaskAudioTags } from '../models';

const useAudioPreferences = () => {
  const { musicPlayback, soundEffects } = useContext(PreferencesContext);

  const isPlayableCallback = useCallback(
    ({
      tags = [],
      ignorePreferences
    }: {
      tags?: tTaskAudioTags;
      ignorePreferences: boolean;
    }): boolean => {
      // Sound Effects
      if (tags && tags.includes(AudioTags.SoundEffects)) {
        return ignorePreferences || false !== soundEffects;
      }

      // Music Playback
      if (tags && tags.includes(AudioTags.MusicPlayback)) {
        return ignorePreferences || false !== musicPlayback;
      }

      return true;
    },
    [musicPlayback, soundEffects]
  );

  return isPlayableCallback;
};

export default useAudioPreferences;
