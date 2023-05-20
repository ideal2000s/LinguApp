import React, { FC, useContext } from 'react';
import ControlItem from '../ControlItem';
import { t } from 'i18n';
import { PreferencesContext } from 'students/views/shared/providers/Preferences';
import { useBreakPoint } from 'students/views/shared/hooks';

import adjustIcon from '../../assets/adjust.svg';

const HighContrastController: FC = () => {
  const { highContrast: preference, setHighContrast: setPreference } = useContext(
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
          ? t('frontend.lesson_task.controls_panel.high_contrast_button.short')
          : t('frontend.lesson_task.controls_panel.high_contrast_button.origin')
      }
      iconUrl={adjustIcon}
      isActive={preference}
      onClick={handleClick}
    />
  );
};

export default HighContrastController;
