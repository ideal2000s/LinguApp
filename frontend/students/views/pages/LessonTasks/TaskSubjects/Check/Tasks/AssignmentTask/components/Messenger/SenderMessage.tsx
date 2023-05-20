import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import Zoom from 'react-medium-image-zoom';
import { IAssignmentItemMessage } from 'students/models';
import { customMediaQuery } from 'students/views/shared/styled';
import ImageContent from 'students/views/shared/components/ImageContent/ImageContent';
import VideoContent from 'students/views/shared/components/MediaPlayer/VideoPlayer/VideoContent';
import 'react-medium-image-zoom/dist/styles.css';

import AudioMessage from './AudioMessage';

interface IMessage {
  message: IAssignmentItemMessage;
  className?: string;
}

const SenderMessage: FC<IMessage> = ({ message, className }) => {
  const { videoURL, imageURL, mobileImageURL, coverImg, giphyImage } = message;
  const hasImageContent = !!imageURL || !!coverImg || giphyImage;

  return (
    <SWrapper>
      {message.audioURL && (
        <SAudioMessage audioURL={message.audioURL} audioSize={3} id="sender_message" />
      )}

      <SMessage className={cn(className)}>
        {videoURL && (
          <SVideoContainer>
            <VideoContent videoURL={videoURL} />
          </SVideoContainer>
        )}

        {hasImageContent && (
          <SImageContainer>
            <Zoom overlayBgColorEnd="rgba(45, 45, 58, 0.9)">
              <ImageContent
                image={imageURL}
                smallImage={mobileImageURL}
                cover={true}
                giphyImage={giphyImage}
                responsiveGiphy={false}
              />
            </Zoom>
          </SImageContainer>
        )}

        {message.title && <SMessageTitle>{message.title}</SMessageTitle>}

        <SMessageText dangerouslySetInnerHTML={{ __html: message.text || '' }} />
      </SMessage>
    </SWrapper>
  );
};

export default SenderMessage;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const SAudioMessage = styled(AudioMessage)`
  margin-bottom: 4px;

  & > div {
    width: 95%;
  }

  ${customMediaQuery('tablet')} {
    & > div {
      width: 85%;
    }
  }
`;

const SMessage = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 99.63%);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
  padding: 16px;
  width: 100%;
  max-width: 95%;

  ${customMediaQuery('tablet')} {
    padding: 20px;
    max-width: 85%;
  }

  &:before {
    content: '';
    display: block;
    border-top: 3px solid rgb(250, 250, 253);
    border-left: 10px solid rgb(250, 250, 253);
    border-bottom: 3px solid transparent;
    border-right: 10px solid transparent;
    position: absolute;
    bottom: -6px;
    left: 0;
  }
`;

const SMessageTitle = styled.h4`
  margin: 0 0 4px;
  color: #2d2d3a;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.75rem;
`;

const SMessageText = styled.p`
  margin: 0;
  color: rgba(45, 45, 58, 0.8);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;

  & img {
    max-width: 100%;
  }
`;

const SImageContainer = styled.div`
  margin: -14px -14px 12px;

  ${customMediaQuery('desktop')} {
    margin: -16px -16px 16px;
  }
`;

const SVideoContainer = styled.div`
  margin: -14px 0 12px 0;

  ${customMediaQuery('tablet')} {
    margin: -16px -16px 16px;
  }
`;
