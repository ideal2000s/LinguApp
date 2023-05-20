import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import ImageContent from 'students/views/shared/components/ImageContent';
import STaskTitle from './styled/STaskTitle';
import STaskDescription from './styled/STaskDescription';
import { tCheckTaskType } from 'students/models';
import { VideoContent } from 'students/views/shared/components/MediaPlayer/VideoPlayer';
import { AudioContent } from 'common/module/AudioPlayer';

interface IProps {
  task: tCheckTaskType;
  className?: string;
}

const BaseCheckTaskBody: FC<IProps> = ({ children, task, className }) => {
  const {
    imageURL,
    audioURL,
    videoURL,
    mobileImageURL,
    coverImg,
    giphyImage,
    introduction,
    title
  } = task;

  const hasDescription = richContentHasText(introduction);

  const showImage = (!!imageURL || !!coverImg || giphyImage) && !videoURL;
  const showVideo = !!videoURL;
  const showAudio = !!audioURL && !videoURL;

  return (
    <SBaseCheckTaskBody className={cn(className)}>
      {showVideo && <SVideoContent videoURL={videoURL || ''} />}

      {showImage && (
        <ImageContent
          image={imageURL}
          cover={coverImg}
          smallImage={mobileImageURL}
          giphyImage={giphyImage}
        />
      )}

      <SPaddedContent>
        {showAudio && (
          <SAudioContent audio={audioURL} size="sm" className="align-self-center" />
        )}

        {!!title && <STaskTitle extraSpace={hasDescription}>{title}</STaskTitle>}

        {hasDescription && introduction && (
          <STaskDescription dangerouslySetInnerHTML={{ __html: introduction }} />
        )}

        {children}
      </SPaddedContent>
    </SBaseCheckTaskBody>
  );
};

export default BaseCheckTaskBody;

export const SBaseCheckTaskBody = styled.div`
  background: white;
  border-radius: 10px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 288px;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    min-width: calc(${({ theme }) => theme.linguBptMd} - 20px);
    border-radius: 20px;
  }
`;

const SVideoContent = styled(VideoContent)`
  border-radius: 0;
`;

const SAudioContent = styled(AudioContent)`
  margin: 0 0 30px 0;
`;

export const SPaddedContent = styled.div`
  padding: 32px 12px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    padding: 50px 70px 40px;
  }
`;

function richContentHasText(__html?: string): boolean {
  if (!__html) return false;
  const tempElement = document.createElement('div');
  tempElement.innerHTML = __html || '';
  const hasContent = tempElement.innerText.trim() !== '';
  tempElement.remove();
  return hasContent;
}
