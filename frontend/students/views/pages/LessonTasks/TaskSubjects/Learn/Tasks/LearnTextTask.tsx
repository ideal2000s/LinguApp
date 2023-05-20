import React, { SyntheticEvent, useCallback, useRef } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { ILearnTaskProps } from '.';
import { ILearnTextTask } from 'students/models/lessonTasks';
import { FinishTaskButton } from '../components';
import ImageContent from 'students/views/shared/components/ImageContent';
import { AudioPlayer } from 'students/views/shared/components/MediaPlayer';
import { useHeartBeatMediaControl } from 'students/views/shared/components/HeartBeat';
import { usePageVisibility } from 'students/views/shared/hooks';

const LearnTextTask: React.FC<ILearnTaskProps<ILearnTextTask>> = ({
  task,
  onFinish,
  lightFont,
  isCompleting
}) => {
  const {
    title,
    imageURL,
    mobileImageURL,
    coverImg,
    giphyImage,
    items: [{ content, audioURL }]
  } = task;
  const audioPlayerRef = useRef<AudioPlayer>(null);
  const { onStartPlaying, onStopPlaying } = useHeartBeatMediaControl();

  const onPageVisibilityChange = useCallback((isHidden: boolean) => {
    isHidden && audioPlayerRef.current?.handlePause();
  }, []);
  usePageVisibility(onPageVisibilityChange);

  function createMarkup() {
    return { __html: content };
  }

  function handleFinish(e: SyntheticEvent): void {
    e.preventDefault();
    onFinish();
  }
  const hasImageContent = !!imageURL || !!coverImg || giphyImage;

  return (
    <STextTaskWrapper>
      <STitle light={lightFont}>{title}</STitle>

      <SMediaWrapper className={cn({ combined: !audioURL && hasImageContent })}>
        {hasImageContent ? (
          <ImageContent
            image={imageURL}
            smallImage={mobileImageURL}
            cover={coverImg}
            giphyImage={giphyImage}
          />
        ) : null}

        {!!audioURL && (
          <SAudioPlayer
            ref={audioPlayerRef}
            url={audioURL}
            onPlay={onStartPlaying}
            onPause={onStopPlaying}
            onEnded={onStopPlaying}
          />
        )}
      </SMediaWrapper>

      <SContentWrapper>
        <SButtonBlock className={cn({ top: !!audioURL })}>
          <SFinishTaskButton onClick={handleFinish} isCompleting={isCompleting} />
        </SButtonBlock>

        <STextContentBlock className={cn({ combined: !audioURL && hasImageContent })}>
          <p dangerouslySetInnerHTML={createMarkup()} />
        </STextContentBlock>
      </SContentWrapper>
    </STextTaskWrapper>
  );
};

export default LearnTextTask;

const STextTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    max-width: 921px;
    align-self: center;
  }
`;

const STitle = styled.h1<{ light: boolean }>`
  color: ${({ light, theme }) => (light ? theme.linguLightFont : theme.linguDarkFont)};
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.625rem;
  text-align: left;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    text-align: center;
  }
`;

const SMediaWrapper = styled.div`
  background: white;
  margin: 0 -1rem;
  position: relative;

  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  &.combined {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin-bottom: 0;
  }

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    margin: 0;
    border-radius: 20px;
    overflow: hidden;
  }
`;

const SAudioPlayer = styled(AudioPlayer)`
  padding: 50px 28px 35px 28px;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    padding: 70px 70px 44px 70px;
  }
`;

const SContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 -1rem -1rem -1rem;
  flex-grow: 1;
  background: white;
  padding-bottom: 2rem;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    margin: 0;
    background: transparent;
    padding-bottom: 0;
  }
`;

const SFinishTaskButton = styled(FinishTaskButton)`
  margin: 0;
`;

const SButtonBlock = styled.div`
  margin: 0;
  order: 3;
  padding: 0 5%;
  width: 100%;
  background: white;

  &.top {
    order: 1;
    padding-bottom: 10px;
  }

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    width: 340px;
    padding: 40px 0;
    background: transparent;

    &.top {
      order: 1;
      padding-bottom: 40px;
    }
  }
`;

const STextContentBlock = styled.div`
  order: 2;
  background: white;
  padding: 2rem 2rem 1rem;
  width: 100%;

  &.combined {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    padding: 2.625rem 3.125rem;
    border-radius: 20px;
    min-height: max-content;
  }
`;
