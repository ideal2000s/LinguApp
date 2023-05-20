import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons/faPlayCircle';
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons/faPauseCircle';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons/faSyncAlt';
import cn from 'classnames';
import styled from 'styled-components';
import { t } from 'i18n';

type tSize = 'sm' | 'md' | 'lg';
export interface IProps {
  isPlaying?: boolean;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  hasError?: boolean;
  isLoading?: boolean;
  className?: string;
  size?: tSize;
}
export const PlayButton: React.FC<IProps> = ({
  isPlaying = false,
  onClick,
  disabled,
  isLoading,
  hasError,
  className,
  size = 'lg'
}) => {
  const sizingClassName = 'audio-player-size-' + size;
  const notReadyAriaLabel = isLoading
    ? t('frontend.media_player.audio_player.aria_loading_button')
    : t('frontend.media_player.audio_player.aria_reload_button');
  if (hasError || isLoading) {
    return (
      <SButton2
        type="button"
        className={cn(className, sizingClassName)}
        onClick={onClick}
        aria-label={notReadyAriaLabel}
        title={notReadyAriaLabel}
      >
        <FontAwesomeIcon
          icon={isLoading ? faCircleNotch : faSyncAlt}
          spin={isLoading}
          size={'3x'}
          color="#ffffff"
        />
      </SButton2>
    );
  }

  const ariaLabel = isPlaying
    ? t('frontend.media_player.audio_player.aria_pause_button')
    : t('frontend.media_player.audio_player.aria_play_button');
  return (
    <SButton
      type="button"
      onClick={onClick}
      className={cn({ pulsing: isPlaying }, className, sizingClassName)}
      disabled={disabled}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <FontAwesomeIcon
        className="playing-btn-svg"
        icon={isPlaying ? faPauseCircle : faPlayCircle}
        size={'5x'}
        color="#009ee2"
      />
    </SButton>
  );
};

export default PlayButton;

const SBaseButton = styled.button`
  background: none;
  border: none;
  position: relative;
  min-width: 80px;
  width: 80px;
  height: 80px;
  border-radius: 50px;
  padding: 0;
  margin: 20px 10px;

  &:focus,
  &:hover {
    outline: none;
    box-shadow: 0px 0px 3px 3px ${(props) => props.theme.linguBlueBtnFocusOutlineColor};
    background: ${(props) => props.theme.linguBlueBtnFocusBg};
  }

  &.audio-player-size {
    &-md {
      transform: scale(0.8);
      margin: -10px;
    }
    &-sm {
      transform: scale(0.5);
      margin: -15px;
    }
  }
`;

const SButton = styled(SBaseButton)`
  &:disabled {
    &::before {
      background: #b9b9b9;
    }
    &::after {
      background: radial-gradient(circle, #ffffff 60%, #b9b9b9 65%);
    }

    .playing-btn-svg {
      color: #b9b9b9;
    }
  }

  .playing-btn-svg {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    box-sizing: content-box;
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  &.pulsing {
    &::before {
      content: '';
      position: absolute;
      z-index: 0;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      display: block;
      width: 80px;
      height: 80px;
      background: #009ee2;
      border-radius: 50%;
      animation: pulse-border 1500ms ease-out infinite;
    }
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: block;
    width: 80px;
    height: 80px;
    background: radial-gradient(circle, #ffffff 60%, #009ee2 65%);
    border-radius: 50%;
    transition: all 200ms;
  }

  .playing-btn:hover:after {
    background-color: darken(#fa183d, 10%);
  }

  @keyframes pulse-border {
    0% {
      transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.5);
      opacity: 0;
    }
  }
`;

const SButton2 = styled(SBaseButton)`
  background: #009ee2;
`;
