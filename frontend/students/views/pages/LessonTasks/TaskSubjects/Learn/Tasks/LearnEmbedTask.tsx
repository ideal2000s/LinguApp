import React, { SyntheticEvent, useEffect } from 'react';
import styled from 'styled-components';
import { ILearnTaskProps } from '.';
import { ILearnEmbedTask } from 'students/models/lessonTasks';
import { FinishTaskButton } from '../components';
import { clearEmbedCode } from '../Helpers';
import {
  useHeartBeatChangeOptions,
  useHeartBeatContextApi
} from 'students/views/shared/components/HeartBeat';

const IDLE_TIMEOUT = 120000; // 2min

const LearnEmbedTask: React.FC<ILearnTaskProps<ILearnEmbedTask>> = ({
  task,
  onFinish,
  lightFont,
  isCompleting
}) => {
  const {
    title,
    items: [{ url }]
  } = task;

  const [urls, embedCode] = clearEmbedCode(url);
  useResetIdleTimerOnMessage();
  useEffect(() => {
    urls.forEach((url) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
    });
  }, [urls]);

  function createMarkup() {
    return { __html: embedCode };
  }

  function handleFinish(e: SyntheticEvent): void {
    e.preventDefault();
    onFinish();
  }

  return (
    <SEmbedTaskWrapper>
      <STitle light={lightFont}>{title}</STitle>

      <SContentWrapper>
        <SMediaWrapper dangerouslySetInnerHTML={createMarkup()} />

        <SButtonBlock>
          <SFinishTaskButton onClick={handleFinish} isCompleting={isCompleting} />
        </SButtonBlock>
      </SContentWrapper>
    </SEmbedTaskWrapper>
  );
};

export default LearnEmbedTask;

function useResetIdleTimerOnMessage() {
  const heartBeatContext = useHeartBeatContextApi();
  useHeartBeatChangeOptions({
    timeout: IDLE_TIMEOUT
  });

  useEffect(() => {
    function handleMessage(event: MessageEvent<any>) {
      switch (event.origin) {
        case 'https://quizlet.com':
        case 'https://h5p.org': {
          heartBeatContext?.reset();
        }
      }
    }
    window.addEventListener('message', handleMessage, false);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [heartBeatContext]);
}

const SEmbedTaskWrapper = styled.div`
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

const SContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 -1rem -1rem -1rem;
  flex-grow: 1;
  background: white;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    margin: 0;
    background: transparent;
  }
`;

const SMediaWrapper = styled.div`
  width: 100%;
  background: white;
  margin: 0 -1rem;
  position: relative;

  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

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

const SButtonBlock = styled.div`
  margin: 0;
  padding: 84px 5% 0 5%;
  width: 100%;
  background: white;

  @media (min-width: ${({ theme }) => theme.linguBptMd}) {
    width: 340px;
    padding: 40px 0;
    background: transparent;
  }
`;

const SFinishTaskButton = styled(FinishTaskButton)`
  margin: 0;
`;
