import React, { FC, useContext } from 'react';
import ControlItem from '../ControlItem';
import { t } from 'i18n';
import { PreferencesContext } from 'students/views/shared/providers/Preferences';

import hintIcon from '../../assets/hint.svg';

const HintsEffectsController: FC = () => {
  const { hintsEffects: preference, setHintsEffects: setPreference } = useContext(
    PreferencesContext
  );

  const handleClick = () => {
    setPreference(!preference);
  };

  return (
    <ControlItem
      label={t('frontend.lesson_task.controls_panel.hints_button')}
      iconUrl={hintIcon}
      isActive={preference}
      onClick={handleClick}
    />
  );
};

export default HintsEffectsController;
