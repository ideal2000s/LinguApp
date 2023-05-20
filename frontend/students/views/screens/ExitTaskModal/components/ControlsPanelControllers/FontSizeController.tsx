import React, { FC, useContext } from 'react';
import ControlItem from '../ControlItem';
import { t } from 'i18n';
import { PreferencesContext } from 'students/views/shared/providers/Preferences';

import textSizeIcon from '../../assets/text-size.svg';

const FontSizeController: FC = () => {
  const { fontSize: preference, setFontSize: setPreference } = useContext(
    PreferencesContext
  );

  const handleClick = () => {
    setPreference(preference + 1);
  };

  return (
    <ControlItem
      label={t('frontend.lesson_task.controls_panel.font_size_button')}
      iconUrl={textSizeIcon}
      isActive
      onClick={handleClick}
    />
  );
};

export default FontSizeController;
