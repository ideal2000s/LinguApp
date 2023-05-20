import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import { useAnimation, motion as m } from 'framer-motion';
import { VideoPlayer } from '../';
import { customMediaQuery } from 'students/views/shared/styled';
import { useCheckForResize, useVideoResizeFallback } from './hooks';
import { useHeartBeatMediaControl } from 'students/views/shared/components/HeartBeat';
import { usePageVisibility } from 'students/views/shared/hooks';

interface IProps {
  videoURL: string;
  className?: string;
  onResizeEnd?: () => void;
}

const VideoContent: React.FC<IProps> = ({ videoURL, className, onResizeEnd }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaWrapperRef, checkForResize] = useCheckForResize();
  const { onStartPlaying, onStopPlaying } = useHeartBeatMediaControl();
  const animationControls = useAnimation();
  const setVideoIsReady = useVideoResizeFallback(onResizeEnd);

  const onPageVisibilityChange = useCallback(
    (isHidden: boolean) => {
      isHidden && setIsPlaying(false);
    },
    [setIsPlaying]
  );
  usePageVisibility(onPageVisibilityChange);

  const handleReady = (): void => {
    setVideoIsReady(true);
    animationControls.start({
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    });
    checkForResize();
    onResizeEnd && onResizeEnd();
  };

  const handlePlay = (): void => {
    setIsPlaying(true);
    onStartPlaying();
  };

  const handlePause = () => {
    onStopPlaying();
  };

  const handleEnded = () => {
    onStopPlaying();
  };

  return (
    <SWrapper className={cn(className)} ref={mediaWrapperRef}>
      <SVideoContainer
        className="flex-grow-1"
        initial={{ opacity: 0 }}
        animate={animationControls}
      >
        <VideoPlayer
          className="flex-grow-1"
          controls={true}
          onPlay={handlePlay}
          onStart={handlePlay}
          onEnded={handleEnded}
          onPause={handlePause}
          onReady={handleReady}
          config={{
            wistia: {
              options: {
                videoFoam: true,
                playerColor: '00a5d7'
              }
            },
            youtube: {
              playerVars: {
                color: 'red',
                modestbranding: 1
              }
            }
          }}
          width="100%"
          height="100%"
          playing={isPlaying}
          loop={false}
          url={videoURL}
        />
      </SVideoContainer>
    </SWrapper>
  );
};

export default VideoContent;

const SWrapper = styled.div`
  margin: 0 -1rem;
  position: relative;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  height: 300px;
  background: rgba(0, 0, 0, 0.3);
  transition: width 0.5s, height 0.5s;

  ${customMediaQuery('tablet')} {
    margin: 0;
    border-radius: 20px;
    overflow: hidden;
    height: 400px;
  }
`;

const SVideoContainer = styled(m.div)`
  width: 100%;
  height: 100%;
`;
