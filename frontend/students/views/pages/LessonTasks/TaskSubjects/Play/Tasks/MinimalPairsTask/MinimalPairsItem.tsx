import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import union from 'lodash/union';
import styled from 'styled-components';
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  useAnimation,
  Variants
} from 'framer-motion';
import UrlIcon from 'students/views/shared/components/UrlIcon';
import ReplayIcon from 'students/views/shared/assets/icons/replay_icon.svg';
import { IMinimalPairsTaskItem } from 'students/models/lessonTasks';
import { useHeartBeatMediaControl } from 'students/views/shared/components/HeartBeat';
import { VideoPlayer } from 'students/views/shared/components/MediaPlayer';
import { customMediaQuery } from 'students/views/shared/styled';
import OptionButton from './components/OptionButton';
import { useCheckForResize } from 'students/views/shared/components/MediaPlayer/VideoPlayer/hooks';
import usePlayAudioPlayer from '../../common/hooks/usePlayAudioPlayer';

const BUTTONS_ANIMATION_DURATION = 500;

export interface ISelectAnswerPayload {
  itemId: number;
  optionId: number;
  attemptsCount: number;
}

interface IMinimalPairsItem {
  item: IMinimalPairsTaskItem;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
}

const MinimalPairsItem: FC<IMinimalPairsItem> = ({ item, onSelectAnswer }) => {
  const { videoURL, question, options } = item;

  const [url, setUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [correctOption, setCorrectOption] = useState<number | null>(null);
  const attemptsCountRef = useRef<number>(0);
  const [isVideoWatched, setIsVideoWatched] = useState(false);
  const [currentWrongOptions, setCurrentWrongOptions] = useState<number[]>([]);

  const taskAnimationControl = useAnimation();
  const [ref, checkForResize] = useCheckForResize();
  const { onStartPlaying, onStopPlaying } = useHeartBeatMediaControl();
  const { playCorrectSound, playIncorrectSound } = usePlayAudioPlayer();

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  const newTaskStart = useCallback(
    async (url) => {
      setIsPlaying(false);
      await taskAnimationControl.start('hidden');
      setUrl(url);
    },
    [taskAnimationControl]
  );

  useEffect(() => {
    newTaskStart(videoURL);
    setIsVideoWatched(false);
    setCorrectOption(null);
    setCurrentWrongOptions([]);
  }, [videoURL, newTaskStart]);

  useEffect(() => {
    attemptsCountRef.current = 0;
  }, [item.id]);

  const handlePlay = () => {
    setIsPlaying(true);
    onStartPlaying();
  };

  const handleVideoEnd = () => {
    if (!isMounted.current) return;
    setIsPlaying(false);
    setIsVideoWatched(true);
    onStopPlaying();
  };

  const showTaskSequence = async () => {
    await taskAnimationControl.start('prepared');
    await taskAnimationControl.start('show');
  };

  const handleVideoReady = () => {
    if (!isMounted.current || isVideoWatched || isPlaying) return;
    checkForResize();
    showTaskSequence();
    setIsPlaying(true);
  };

  const handleSelectAnswer = (optionId: number, attemptsCount: number) => {
    onSelectAnswer({
      itemId: item.id,
      optionId,
      attemptsCount
    });
  };

  const handleOptionClick = (optionId: number) => {
    if (optionId === undefined) return;
    const selectedOption = options.find((option) => option.id === optionId);
    if (selectedOption?.correct) {
      playCorrectSound();
      setCorrectOption(selectedOption.id);
      setTimeout(() => {
        taskAnimationControl.start('hidden');
        handleSelectAnswer(selectedOption.id, attemptsCountRef.current);
      }, BUTTONS_ANIMATION_DURATION * 2);
    } else {
      playIncorrectSound();
      setCurrentWrongOptions((prev: number[]) => union(prev, [optionId]));
      attemptsCountRef.current += 1;
    }
  };

  return (
    <AnimateSharedLayout>
      <STaskItemWrapper
        layout
        initial="hidden"
        animate={taskAnimationControl}
        variants={taskVariants}
        as={motion.div}
      >
        <AnimatePresence>
          <SPlayerWrapper ref={ref} key="player" layout="position" as={motion.div}>
            {!isPlaying && (
              <SReplay
                variants={replayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={handlePlay}
                as={motion.button}
              >
                <UrlIcon url={ReplayIcon} color="#FBFCFF" height="77px" width="77px" />
              </SReplay>
            )}
            <VideoPlayer
              onEnded={handleVideoEnd}
              onPause={onStopPlaying}
              width="100%"
              height="100%"
              playing={isPlaying}
              url={url}
              onReady={handleVideoReady}
              playsinline
            />
          </SPlayerWrapper>
          {isVideoWatched && (
            <SQuestionBlock
              key="questions"
              transition={commonTransition}
              variants={blockVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              as={motion.div}
            >
              <SQuestion>{question}</SQuestion>
              <SAnswerOptions $optionLength={options.length}>
                {options.map((option) => (
                  <OptionButton
                    key={option.id}
                    id={option.id}
                    length={options.length}
                    onClick={handleOptionClick}
                    isCorrect={correctOption === option.id}
                    isWrong={currentWrongOptions.includes(option.id)}
                    text={option.answer}
                  />
                ))}
              </SAnswerOptions>
            </SQuestionBlock>
          )}
        </AnimatePresence>
      </STaskItemWrapper>
    </AnimateSharedLayout>
  );
};

export default MinimalPairsItem;

const commonTransition = { duration: 0.5 };
const taskVariants: Variants = {
  prepared: {
    opacity: 0,
    scale: 1,
    y: 40,
    transition: {
      when: 'afterChildren',
      duration: 0.1
    }
  },
  show: { opacity: 1, scale: 1, y: 0 },
  hidden: { opacity: 0, scale: 0.9, y: 0 }
};
const blockVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 40 }
};
const replayVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};

const STaskItemWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  ${customMediaQuery('tablet')} {
    margin-top: 0;
  }
`;

const SPlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: 4px;
  max-width: 90vw;
  max-height: 60vh;
  overflow: hidden;
  background: #ffffff30;
  z-index: 1;
  margin: 2.5rem 0;
  transition: height 0.3s ease;

  ${customMediaQuery('tablet')} {
    max-width: 492px;
  }
`;

const SReplay = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  padding: 0;
  border: none;
  z-index: 1;

  &:hover,
  &:focus,
  &:active {
    border: none;
    outline: none;
    opacity: 1;
  }
`;

const SQuestionBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
`;

const SQuestion = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 91.02%;
  text-align: center;
  letter-spacing: -0.035em;
  margin: 0;

  ${customMediaQuery('tablet')} {
    font-size: 32px;
  }
`;

const SAnswerOptions = styled.ol<{ $optionLength: number }>`
  list-style: none;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding-top: 2rem;
  padding-left: 0;
  justify-content: center;
  margin: 0;

  ${customMediaQuery('tablet')} {
    max-width: ${(props) => (props.$optionLength % 3 === 0 ? '612px' : '466px')};
  }
`;
