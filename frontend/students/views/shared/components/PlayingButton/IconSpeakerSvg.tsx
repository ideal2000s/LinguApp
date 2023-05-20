import React from 'react';
import styled from 'styled-components';

const SSvgContainer = styled.div`
  overflow: hidden;
  display: inline-flex;
`;
const SSvg = styled.svg`
  @keyframes bounce {
    0% {
      transform: scale(1.1);
    }
    15% {
      transform: scale(1.15);
    }
    35% {
      transform: scale(1.1);
    }
    70% {
      transform: scale(1.15);
    }
    90% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1.1);
    }
  }

  @keyframes pulse-1 {
    0% {
      transform: translateX(-5px);
    }
    20% {
      transform: translateX(0);
    }
  }
  @keyframes pulse-2 {
    0% {
      transform: translateX(-4px);
      opacity: 0;
    }
    20% {
      transform: translateX(-4px);
      opacity: 0;
    }
    50% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes pulse-3 {
    0% {
      transform: translateX(-5px);
      opacity: 0;
    }
    50% {
      transform: translateX(-5px);
      opacity: 0;
    }
    70% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  & .wave-1,
  & .wave-2,
  & .wave-3 {
    display: none;
  }

  &.playing {
    animation: bounce 1s alternate infinite;

    & .wave-1 {
      display: initial;
      animation: pulse-1 1s alternate ease-out infinite;
    }

    & .wave-2 {
      display: initial;
      animation: pulse-2 1s alternate ease-out infinite;
    }

    & .wave-3 {
      display: initial;
      animation: pulse-3 1s alternate ease-out infinite;
    }
  }
`;

interface IProps {
  isPlaying?: boolean;
  className: string;
}

const IconSpeakerSvg: React.FC<IProps> = ({ isPlaying = false, className }) => {
  return (
    <SSvgContainer className={className}>
      <SSvg
        className={isPlaying ? 'playing' : ''}
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <circle cx="25" cy="25" r="25" fill="#e7f6fe" /> */}
        <path
          className="svg-speaker"
          d="M 27.4 14.2 L 20.4 20.2 L 16.4 20.6 C 15.6 20.7 15 21.4 15 22.2 V 27.8 C 15 28.6 15.6 29.3 16.4 29.4 L 20.4 29.8 L 27.4 35.8 C 27.9 36.3 28.8 35.8 28.8 35.1 V 14.9 C 28.8 14.2 27.9 13.7 27.4 14.2 Z"
          fill="#68bbe3"
        />
        <path
          className="svg-speaker-wave wave-1"
          d="M 34.1 21.5 C 33.7 20.9 32.8 20.7 32.2 21.2 L 32.1 21.3 C 31.7 21.7 31.6 22.3 31.9 22.8 C 32.2 23.4 32.4 24.2 32.4 25 C 32.4 25.7 32.2 26.5 31.9 27.1 C 31.6 27.6 31.7 28.2 32.1 28.6 L 32.2 28.7 C 32.8 29.2 33.7 29.1 34.1 28.4 C 34.7 27.4 35 26.2 35 24.9 C 35 23.7 34.7 22.6 34.1 21.5 Z"
          fill="#68bbe3"
        />
        <path
          className="svg-speaker-wave wave-2"
          d="M 38 19.2 C 37.6 18.1 36.7 17.9 36.1 18.7 L 36 18.8 C 35.6 19.4 35.5 20.5 35.8 21.2 C 36.1 22.2 36.3 23.4 36.3 24.6 C 36.3 25.9 36.1 27 35.8 28 C 35.5 28.8 35.6 29.8 36 30.4 L 36.1 30.5 C 36.7 31.4 37.6 31.2 38 30 C 38.6 28.5 38.9 26.6 38.9 24.6 C 38.9 22.7 38.6 20.8 38 19.2 Z"
          fill="#68bbe3"
        />
        <path
          className="svg-speaker-wave wave-3"
          d="M 42.4 16 C 42 14.4 41.1 14 40.5 15.3 L 40.5 15.4 C 40 16.3 39.9 17.8 40.2 19 C 40.5 20.5 40.7 22.2 40.7 24 C 40.7 25.9 40.5 27.6 40.2 29.1 C 39.9 30.2 40 31.8 40.5 32.7 L 40.5 32.8 C 41.1 34.1 42 33.8 42.4 32.1 C 43 29.7 43.3 26.9 43.3 24 C 43.3 21.2 43 18.4 42.4 16 Z"
          fill="#68bbe3"
        />
      </SSvg>
    </SSvgContainer>
  );
};

export default IconSpeakerSvg;
