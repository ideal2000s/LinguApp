import React from 'react';
import styled from 'styled-components';
import IconSpeakerSvg from './IconSpeakerSvg';
import { Translate } from 'i18n';

const SButton = styled.button`
  height: 54px;
  width: 232px;
  background-color: #e7f6fe;
  border-radius: 5px;
  border: none;
  padding: 0;

  display: flex;
  align-items: center;

  & .playing-icon {
    position: absolute;
  }
`;

const SLabel = styled.span`
  margin-left: 50%;
  transform: translateX(-50%);
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPlaying: boolean;
}

const PlayingButton: React.FC<IProps> = ({ isPlaying, onClick }) => {
  const textSrc = isPlaying
    ? 'frontend.old.speaker_tester.audio_is_playing'
    : 'frontend.old.speaker_tester.start_playing_audio';
  return (
    <SButton type="button" onClick={onClick}>
      <IconSpeakerSvg className="playing-icon" isPlaying={isPlaying} />
      <SLabel>
        <Translate str={textSrc} />
      </SLabel>
    </SButton>
  );
};

export default PlayingButton;
