import React, { FC, useContext } from 'react';
import ControlItem from '../ControlItem';
import { t } from 'i18n';
import { PreferencesContext } from 'students/views/shared/providers/Preferences';
import { useBreakPoint } from 'students/views/shared/hooks';

import volumeIcon from '../../assets/volume.svg';
import volumeMuteIcon from '../../assets/volume-mute.svg';

const SoundEffectsController: FC = () => {
  const { soundEffects: preference, setSoundEffects: setPreference } = useContext(
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
          ? t('frontend.lesson_task.controls_panel.sound_effects_button.short')
          : t('frontend.lesson_task.controls_panel.sound_effects_button.origin')
      }
      iconUrl={preference ? volumeIcon : volumeMuteIcon}
      isActive={preference}
      onClick={handleClick}
    />
  );
};

export default SoundEffectsController;
