import React, { FC, useContext } from 'react';
import ControlItem from '../ControlItem';
import { t } from 'i18n';
import { PreferencesContext } from 'students/views/shared/providers/Preferences';
import { useBreakPoint } from 'students/views/shared/hooks';

import musicIcon from '../../assets/music.svg';

const MusicPlaybackController: FC = () => {
  const { musicPlayback: preference, setMusicPlayback: setPreference } = useContext(
    PreferencesContext
  );
  const isMobile = useBreakPoint('md', true);

  const handleClick = () => {
    setPreference(!preference);
  };

  return (
    <ControlItem
      label={
        isMobile
          ? t('frontend.lesson_task.controls_panel.music_playback_button.short')
          : t('frontend.lesson_task.controls_panel.music_playback_button.origin')
      }
      iconUrl={musicIcon}
      isActive={preference}
      onClick={handleClick}
    />
  );
};

export default MusicPlaybackController;
