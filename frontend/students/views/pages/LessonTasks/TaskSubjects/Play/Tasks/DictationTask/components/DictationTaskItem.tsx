import React, { FC, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { AnimateSharedLayout, motion as m, useAnimation } from 'framer-motion';
import { IDictationItem, IDictationTask } from 'students/models/lessonTasks';
import { useAnimateScenarios, useWrongAnimation } from 'students/views/shared/hooks';
import { SvgAudioPlayer } from 'students/views/shared/components/MediaPlayer';
import { customMediaQuery } from 'students/views/shared/styled';
import LottieIcon from 'students/views/shared/components/LottieIcon';

import HintTooltip from './HintTooltip';
import WordInput from './WordInput';
import CharacterButton from './CharacterButton';
import { useHintAnimation, dictationAnimateScenarios } from './animations';
import HintAnimationURL from '../assets/hint_animation.json';
import { usePlayAudioPlayer } from '../../../common/hooks';

const RESULT_BLOCK_WRONG_CLASS_NAME = 'wrongAnimation';

export interface ISelectAnswerPayload {
  itemId: number | null;
  attemptsCount: number;
}

interface IDictationTaskItem {
  item: IDictationItem;
  characters: IDictationTask['characters'];
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  goToWrongAnswerScreen: (payload: ISelectAnswerPayload) => void;
  className?: string;
  showHint?: boolean;
}

const HINT_TIMEOUT = 10000;
const TASK_TIMEOUT = 30000;
const AUTOPLAY_DELAY = 2000;

const DictationTaskItem: FC<IDictationTaskItem> = ({
  item,
  characters,
  onSelectAnswer,
  goToWrongAnswerScreen,
  className,
  showHint
}) => {
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(true);
  const [resultBlockRef, showWrongAnimation] = useWrongAnimation(
    undefined,
    RESULT_BLOCK_WRONG_CLASS_NAME
  );
  const [headerAnimationControls, animateHeaderAnimationControls] = useAnimateScenarios(
    dictationAnimateScenarios
  );
  const [contentAnimationControls, animateContentAnimationControls] = useAnimateScenarios(
    dictationAnimateScenarios
  );
  const timeoutBlockControls = useAnimation();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const attemptsCountRef = useRef<number>(0);
  const { playCorrectSound, playIncorrectSound } = usePlayAudioPlayer();
  const [hintVisible, setHintVisible] = useState<boolean>(false);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [hintAnimationVisible, setHintAnimationVisible] = useState<boolean>(false);
  const idleTimeout = useRef<number | null>(null);
  const taskTimeout = useRef<number | null>(null);
  const [audioStopped, setAudioStopped] = useState<boolean>(false);

  useEffect(() => {
    if (audioStopped) {
      timeoutBlockControls.start({
        clipPath: 'ellipse(150% 100% at 50% 10%)',
        transition: {
          duration: TASK_TIMEOUT / 1000
        }
      });
    }
  }, [audioStopped, timeoutBlockControls]);

  const handleWrongAnswer = useCallback(() => {
    goToWrongAnswerScreen({
      itemId: item.id,
      attemptsCount: attemptsCountRef.current
    });
  }, [goToWrongAnswerScreen, item]);

  useEffect(() => {
    if (!item) return;

    setCurrentAnswer('');
    animateHeaderAnimationControls(['header-appear']);
    animateContentAnimationControls(['content-appear']);
    inputRef.current && inputRef.current.focus();
  }, [
    item,
    headerAnimationControls,
    contentAnimationControls,
    animateHeaderAnimationControls,
    animateContentAnimationControls
  ]);

  // set timer for task
  useEffect(() => {
    if (taskTimeout.current) {
      clearTimeout(taskTimeout.current);
    }
    if (audioStopped) {
      taskTimeout.current = window.setTimeout(() => {
        handleWrongAnswer();
      }, TASK_TIMEOUT);
    }

    return () => {
      taskTimeout.current && clearTimeout(taskTimeout.current);
    };
  }, [audioStopped, handleWrongAnswer]);

  useEffect(() => {
    if (compareSentences(currentAnswer, item.cleanSentence, true)) {
      playCorrectSound();

      const headerAnimationTimer = window.setTimeout(() => {
        animateHeaderAnimationControls(['disappear']);
        animateContentAnimationControls(['disappear']);
      }, 1000);

      const onSelectAnswerTimer = window.setTimeout(() => {
        onSelectAnswer({
          itemId: item.id,
          attemptsCount: attemptsCountRef.current
        });

        attemptsCountRef.current = 0;
      }, 2500);
      return () => {
        clearTimeout(headerAnimationTimer);
        clearTimeout(onSelectAnswerTimer);
      };
    }
    return () => null;
    /* eslint-disable-next-line */
  }, [currentAnswer]);

  const showHintAnimation = useCallback(() => {
    setHintAnimationVisible(true);
  }, [setHintAnimationVisible]);

  const hideHintAnimation = useCallback(() => {
    setHintVisible(false);
    setTooltipVisible(false);
    setHintAnimationVisible(false);
  }, [setHintVisible, setTooltipVisible, setHintAnimationVisible]);

  // set timer for hint
  useEffect(() => {
    if (idleTimeout.current) {
      hideHintAnimation();
      clearTimeout(idleTimeout.current);
    }
    if (showHint && audioStopped) {
      idleTimeout.current = window.setTimeout(() => {
        showHintAnimation();
      }, HINT_TIMEOUT);
    }

    return () => {
      idleTimeout.current && clearTimeout(idleTimeout.current);
    };
  }, [audioStopped, hideHintAnimation, item, showHint, showHintAnimation]);

  useHintAnimation(hintAnimationVisible, { setHintVisible, setTooltipVisible });

  const handleInputChange = (value: string) => {
    hideHintAnimation();
    setCurrentAnswer(value);

    if (value.endsWith(' ')) {
      if (compareSentences(value, item.cleanSentence)) {
        setIsAnswerCorrect(true);
      } else {
        setIsAnswerCorrect(false);
        showWrongAnimation();
        playIncorrectSound();

        attemptsCountRef.current += 1;
      }
    }

    if (compareSentences(value, item.cleanSentence)) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  const handleClickOnCharacter = (character: string) => {
    if (compareSentences(currentAnswer + character, item.cleanSentence)) {
      setCurrentAnswer((prevValue: string) => prevValue + character);
    } else {
      showWrongAnimation();
      playIncorrectSound();

      attemptsCountRef.current += 1;
    }

    const inputNode = inputRef.current;
    if (inputNode) {
      inputNode.focus();
    }
  };

  const handleEnterKeyPress = () => {
    if (!compareSentences(currentAnswer, item.cleanSentence, true)) {
      handleWrongAnswer();
    }
  };

  const handleStopAudio = useCallback(() => {
    setAudioStopped(true);
  }, []);

  const currentHintWord = useMemo(() => {
    const correctWords = item.cleanSentence.split(' ');
    const usersWords = currentAnswer.trim().split(' ');
    let index = 0;

    while (correctWords[index] === usersWords[index] && index < correctWords.length) {
      index += 1;
    }

    return correctWords[index];
  }, [currentAnswer, item]);

  return (
    <AnimateSharedLayout>
      <SWordsItemWrapper key={item.id} className={cn(className)}>
        <STimeoutBlock
          initial={{ clipPath: 'ellipse(150% 100% at 50% -100%)' }}
          animate={timeoutBlockControls}
          key={`${item.id}_timeout`}
        />
        <SHeader
          initial={{
            opacity: 0,
            y: 50
          }}
          animate={headerAnimationControls}
        >
          <SSvgAudioPlayer
            src={item.audioURL}
            color="#834581"
            progressColor="#fbfcff"
            autoplay
            autoPlayDelay={AUTOPLAY_DELAY}
            onAudioStopped={handleStopAudio}
            onEnd={handleStopAudio}
          />

          <SWordInput
            ref={inputRef}
            key={item?.id}
            animationRef={resultBlockRef}
            value={currentAnswer}
            onChange={handleInputChange}
            onEnterKeyPress={handleEnterKeyPress}
            isCorrect={isAnswerCorrect}
            isFinished={compareSentences(currentAnswer, item.cleanSentence, true)}
            highlightHint={tooltipVisible}
          />

          {hintVisible && <SLottieIcon animationJSONData={HintAnimationURL} />}

          {tooltipVisible && (
            <HintTooltip show={tooltipVisible} text={currentHintWord} target={inputRef} />
          )}
        </SHeader>

        <m.div
          initial={{
            opacity: 0,
            y: 50
          }}
          animate={contentAnimationControls}
        >
          {characters.length > 0 && (
            <SCharactersBlock>
              {characters.map((character: string) => (
                <CharacterButton
                  key={character}
                  onClick={handleClickOnCharacter}
                  character={character}
                />
              ))}
            </SCharactersBlock>
          )}
        </m.div>
      </SWordsItemWrapper>
    </AnimateSharedLayout>
  );
};

export default DictationTaskItem;

//find special characters for remove
const cleanRegExp = /[^\p{L}\d\s]/gmu;
function compareSentences(
  input: string,
  cleanSentence: string,
  fullMatch?: boolean
): boolean {
  const cleanInput = input
    .toLocaleLowerCase()
    .replace(cleanRegExp, '')
    .replace(/\s\s+/g, ' ');
  const cleanSentenceWithNoExtraSpaces = cleanSentence
    .replace('-', '')
    .replace(/\s\s+/g, ' ');

  return fullMatch
    ? cleanSentenceWithNoExtraSpaces.toLowerCase() === cleanInput
    : cleanSentenceWithNoExtraSpaces.toLowerCase().startsWith(cleanInput);
}

const SWordsItemWrapper = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;

  ${customMediaQuery('tablet')} {
    width: 557px;
  }
`;

const SHeader = styled(m.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  position: relative;
  margin: 0 0 16px;
`;

const SSvgAudioPlayer = styled(SvgAudioPlayer)`
  margin-bottom: 80px;

  ${customMediaQuery('tablet')} {
    margin-bottom: 70px;
  }
`;

const SCharactersBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  & > button {
    margin: 0 6px;
  }
`;

const SWordInput = styled(WordInput)`
  width: 100%;

  @keyframes wrongAnimation {
    20% {
      background: #ffffff35;
    }
    100% {
      background: #00000035;
    }
  }

  @keyframes wrongShake {
    33% {
      transform: translateX(-3px);
    }
    66% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  &.${RESULT_BLOCK_WRONG_CLASS_NAME} {
    animation: 0.8s wrongAnimation, 0.4s wrongShake;
  }
`;

const SLottieIcon = styled(LottieIcon)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate3d(-50%, 50%, 0) !important;
  height: 100px !important;
  width: 100px !important;
`;

const STimeoutBlock = styled(m.div)`
  background: linear-gradient(180deg, rgba(184, 101, 181, 0) 0%, #6f348d 100%);
  opacity: 0.3;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
