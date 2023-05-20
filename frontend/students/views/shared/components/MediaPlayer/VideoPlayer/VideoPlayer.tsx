import React, { useEffect, useRef } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import cn from 'classnames';
import styled from 'styled-components';

interface IProps extends ReactPlayerProps {
  className?: string;
}

const otherVideoSites = ['www.elevkanalen.no'];

const VideoPlayer: React.FC<IProps> = (props) => {
  const { className, ...playerProps } = props;
  const videoUrlHost = useRef<string>('');
  const playerPropsWithDefault = {
    width: '100%',
    height: '100%',
    ...playerProps
  };

  useEffect(() => {
    try {
      videoUrlHost.current = new URL(String(playerProps.url)).hostname;
    } catch (_e) {
      /* noop */
    }
  }, [playerProps.url]);

  return (
    <SWrapper className={cn(className)}>
      {otherVideoSites.includes(videoUrlHost.current) ? (
        <SIframe src={String(playerProps.url)} frameBorder="0" />
      ) : (
        <ReactPlayer {...playerPropsWithDefault} />
      )}
    </SWrapper>
  );
};

const SWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const SIframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

export default VideoPlayer;
