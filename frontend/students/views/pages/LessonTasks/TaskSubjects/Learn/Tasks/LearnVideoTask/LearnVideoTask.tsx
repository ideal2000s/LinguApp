import React, { SyntheticEvent, useMemo } from 'react';
import styled from 'styled-components';
import { motion as m } from 'framer-motion';
import { ILearnTaskProps } from '../index';
import { ILearnVideoTask } from 'students/models/lessonTasks';
import { FinishTaskButton } from '../../components';
import { customMediaQuery } from 'students/views/shared/styled';
import { htmlStringHasContent } from 'students/views/shared/helpers';
import { VideoContent } from 'students/views/shared/components/MediaPlayer/VideoPlayer';
import { useNextBtnAnimation } from './hooks';

const LearnVideoTask: React.FC<ILearnTaskProps<ILearnVideoTask>> = ({
  task,
  onFinish,
  lightFont,
  isCompleting
}) => {
  const {
    title,
    items: [{ caption, url }]
  } = task;

  const handleFinish = (e: SyntheticEvent): void => {
    e.preventDefault();
    onFinish();
  };

  const [nextBtnControls, handleResizeEnd] = useNextBtnAnimation();

  const captionHasText = useMemo(() => htmlStringHasContent(caption), [caption]);

  return (
    <SVideoTaskWrapper>
      <STitle light={lightFont}>{title}</STitle>

      <VideoContent videoURL={url} onResizeEnd={handleResizeEnd} />

      <SContentWrapper>
        <SButtonBlock initial={{ opacity: 0 }} animate={nextBtnControls}>
          <SFinishTaskButton onClick={handleFinish} isCompleting={isCompleting} />
        </SButtonBlock>

        {captionHasText ? (
          <STextContentBlock>
            <p dangerouslySetInnerHTML={{ __html: caption }} />
          </STextContentBlock>
        ) : null}
      </SContentWrapper>
    </SVideoTaskWrapper>
  );
};

export default LearnVideoTask;

const SVideoTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;

  ${customMediaQuery('tablet')} {
    max-width: 921px;
    align-self: center;
    width: 100%;
  }
`;

const STitle = styled.h1<{ light: boolean }>`
  color: ${({ light, theme }) => (light ? theme.linguLightFont : theme.linguDarkFont)};
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.625rem;
  text-align: left;

  ${customMediaQuery('tablet')} {
    font-size: 1.75rem;
    text-align: center;
  }
`;

const STextContentBlock = styled.div`
  background: white;
  padding: 0 1rem 1rem;
  width: 100%;
  letter-spacing: -0.02em;

  ${customMediaQuery('tablet')} {
    padding: 2.7rem 3.125rem 2.25rem;
    border-radius: 20px;
    min-height: max-content;
    letter-spacing: -0.01em;
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

  ${customMediaQuery('tablet')} {
    margin: 0;
    background: transparent;
    padding-bottom: 0;
  }
`;

const SButtonBlock = styled(m.div)`
  margin: 0;
  padding: 32px 5%;
  width: 100%;
  background: white;

  ${customMediaQuery('tablet')} {
    width: 340px;
    padding: 40px 0;
    background: transparent;
  }
`;

const SFinishTaskButton = styled(FinishTaskButton)`
  margin: 0;
`;
