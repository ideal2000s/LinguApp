import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { customMediaQuery } from 'students/views/shared/styled';
import {
  MusicPlaybackController,
  SoundEffectsController,
  HintsEffectsController
  // FontSizeController,
  // HighContrastController
} from './ControlsPanelControllers';

interface IProps {
  className?: string;
}

const ControlsPanel: FC<IProps> = ({ className }) => {
  return (
    <SControlsPanel className={cn(className)}>
      <MusicPlaybackController />
      <SoundEffectsController />
      <HintsEffectsController />
      {/*<FontSizeController />*/}
      {/*<HighContrastController />*/}
    </SControlsPanel>
  );
};

export default ControlsPanel;

const SControlsPanel = styled.div`
  display: flex;

  > div {
    margin: 0 9px;
    ${customMediaQuery('desktop')} {
      margin: 0 32px;
    }
  }
`;
