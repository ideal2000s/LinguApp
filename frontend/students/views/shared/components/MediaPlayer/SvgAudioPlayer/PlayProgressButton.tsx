import React, { useRef } from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { t } from 'i18n';
import ButtonGeneral from '../../ButtonGeneral';

interface IProps {
  progress: number;
  color: string;
  progressColor: string;
  className?: string;
  onClick: () => void;
}

const PlayProgressButton: React.FC<IProps> = ({
  progress,
  className,
  color,
  progressColor,
  onClick
}) => {
  const clipPathId = useRef(v4());
  const rectClipPath = `url(#${clipPathId.current})`;

  return (
    <SButton
      title={t('frontend.media_player.audio_player.aria_play_button')}
      className={cn(className)}
      onClick={onClick}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="player-container"
          x="0"
          y="0"
          height="100%"
          width="100%"
          fill={color}
          clipPath={rectClipPath}
        />

        <rect
          className="player-progress"
          x="0"
          y="0"
          height="100%"
          width={`${progress}%`}
          fill={progressColor}
          clipPath={rectClipPath}
        />

        <defs>
          <clipPath id={clipPathId.current}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.925781 12.0703C0.925781 5.71904 6.07451 0.570312 12.4258 0.570312H44.4258C50.7771 0.570312 55.9258 5.71904 55.9258 12.0703V44.0703C55.9258 50.4216 50.7771 55.5703 44.4258 55.5703H12.4258C6.07451 55.5703 0.925781 50.4216 0.925781 44.0703V12.0703ZM12.4258 3.57031C7.73136 3.57031 3.92578 7.37589 3.92578 12.0703V44.0703C3.92578 48.7647 7.73136 52.5703 12.4258 52.5703H44.4258C49.1202 52.5703 52.9258 48.7647 52.9258 44.0703V12.0703C52.9258 7.37589 49.1202 3.57031 44.4258 3.57031H12.4258ZM27.7228 17.8891C28.2425 18.1389 28.573 18.6644 28.573 19.241V38.1994C28.573 38.776 28.2425 39.3016 27.7228 39.5513C27.2031 39.8011 26.5862 39.7309 26.1359 39.3707L19.776 34.2827H14.8855C14.057 34.2827 13.3855 33.6111 13.3855 32.7827V24.6577C13.3855 23.8293 14.057 23.1577 14.8855 23.1577H19.776L26.1359 18.0697C26.5862 17.7095 27.2031 17.6393 27.7228 17.8891ZM25.573 22.362L21.2392 25.829C20.9732 26.0418 20.6427 26.1577 20.3021 26.1577H16.3855V31.2827H20.3021C20.6427 31.2827 20.9732 31.3986 21.2392 31.6114L25.573 35.0784V22.362ZM39.0618 18.086C38.4761 17.5001 37.5264 17.4999 36.9405 18.0856C36.3546 18.6713 36.3545 19.6211 36.9402 20.207C39.1976 22.4651 40.4658 25.5274 40.4658 28.7204C40.4658 31.9134 39.1976 34.9757 36.9402 37.2339C36.3545 37.8198 36.3546 38.7695 36.9405 39.3552C37.5264 39.9409 38.4761 39.9408 39.0618 39.3549C41.8817 36.5341 43.4658 32.7089 43.4658 28.7204C43.4658 24.7319 41.8817 20.9067 39.0618 18.086ZM34.2816 22.8662C33.6959 22.2803 32.7461 22.2802 32.1603 22.8658C31.5744 23.4515 31.5743 24.4013 32.16 24.9872C33.1481 25.9756 33.7032 27.316 33.7032 28.7136C33.7032 30.1113 33.1481 31.4517 32.16 32.4401C31.5743 33.026 31.5744 33.9757 32.1603 34.5614C32.7461 35.1471 33.6959 35.147 34.2816 34.5611C35.8321 33.0101 36.7032 30.9068 36.7032 28.7136C36.7032 26.5205 35.8321 24.4172 34.2816 22.8662Z"
            />
          </clipPath>
        </defs>
      </svg>
    </SButton>
  );
};

export default PlayProgressButton;

const SButton = styled(ButtonGeneral)`
  display: inline-block;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  background: none;
  border: none;
  width: 56px;
  height: 56px;
`;
