import React, { useRef, useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { IPlayAuditionItem } from 'students/models/lessonTasks';
import GameCloseButton from 'students/views/pages/Games/common/GameCloseButton';
import LottieIcon from 'students/views/shared/components/LottieIcon/LottieIcon';
import DraggableWaveSurfer from './DraggableWaveSurfer';
import WordViewport, { tHintStatus } from './WordViewport';
import { usePlayAudioPlayer } from '../../../common/hooks';
import handSwipeAnimationData from '../assets/handSwipe.json';
import { PreferencesContext } from 'students/views/shared/providers/Preferences';

export interface ISelectAnswerPayload {
  itemId: number;
  attemptsCount: number;
}

interface IProps {
  item: IPlayAuditionItem;
  audioUrl: string | null;
  onSelectAnswer: (payload: ISelectAnswerPayload) => void;
  className?: string;
  from?: number;
  initiallyShowOptions?: boolean;
}

const SHOW_HINT_DELAY = 8000;
const SHOW_PULSE_DELAY = 14000;

const AuditionItem: React.FC<IProps> = ({
  item,
  audioUrl,
  onSelectAnswer,
  className,
  from = 0,
  initiallyShowOptions = false
}) => {
  const attemptsCountRef = useRef<number>(0);
  const { playCorrectSound, playIncorrectSound } = usePlayAudioPlayer();
  const [wordsVisible, setWordsVisible] = useState(initiallyShowOptions);
  const lastInteractionTime = useRef<number>(Date.now());
  const [hint, setHint] = useState<tHintStatus>('none');
  const hintPlayed = useRef(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [hintDrag, setHintDrag] = useState(false);
  const { hintsEffects } = useContext(PreferencesContext);

  useEffect(() => {
    if (hintsEffects && wordsVisible) {
      const timer = setInterval(() => {
        if (
          Date.now() - lastInteractionTime.current > SHOW_PULSE_DELAY &&
          hint === 'tap'
        ) {
          setHint('pulsate');
        } else if (
          Date.now() - lastInteractionTime.current > SHOW_HINT_DELAY &&
          !hintPlayed.current
        ) {
          setHintDrag(true);
          hintPlayed.current = true;
          setHint('tap');
        }
      }, 500);
      return () => clearInterval(timer);
    }
    return () => null;
  }, [hintsEffects, wordsVisible, hint]);

  useEffect(() => {
    attemptsCountRef.current = 0;
    setWrongAnswer(false);
    setHint('none');
    setWordsVisible(false);
  }, [item.id]);

  const handleSuccess = () => {
    setWrongAnswer(false);
    playCorrectSound();
    onSelectAnswer({
      itemId: item.id,
      attemptsCount: attemptsCountRef.current
    });
    lastInteractionTime.current = Date.now();
  };

  const handleError = () => {
    playIncorrectSound();
    attemptsCountRef.current += 1;
    lastInteractionTime.current = Date.now();
    setHint('none');
    if (attemptsCountRef.current >= 3) {
      setWordsVisible(false);
      setWrongAnswer(true);
    }
  };

  const handleAudioPause = useCallback(() => {
    lastInteractionTime.current = Date.now();
    setWordsVisible(true);
  }, []);

  return (
    <SContainer className={cn(className)}>
      {audioUrl && (
        <SWaveContainer>
          <DraggableWaveSurfer
            url={audioUrl}
            from={from}
            to={item.start}
            onPause={handleAudioPause}
          />
          {hintDrag && hint === 'tap' && (
            <SHandWrapper>
              <LottieIcon
                animationJSONData={handSwipeAnimationData}
                width="6rem"
                loop={false}
                autoPlay={true}
              />
            </SHandWrapper>
          )}
        </SWaveContainer>
      )}
      <SBlockContainer $hint={hint}>
        <AnimatePresence>
          {wordsVisible && (
            <SViewportWrapper
              key={item.id}
              as={motion.div}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              exit={{ opacity: 0, y: -100, transition: { duration: 1 } }}
            >
              <WordViewport
                item={item}
                onSuccess={handleSuccess}
                onError={handleError}
                hint={hint}
              />
            </SViewportWrapper>
          )}
          {wrongAnswer && (
            <SErrorWrapper as={motion.div} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GameCloseButton onTap={handleSuccess} size="5.5rem" />
              <SCorrectWord>{item.correctWord.body}</SCorrectWord>
            </SErrorWrapper>
          )}
        </AnimatePresence>
      </SBlockContainer>
    </SContainer>
  );
};

export default AuditionItem;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SWaveContainer = styled.div`
  width: 100%;
  max-width: 670px;
  position: relative;
`;

const SBlockContainer = styled.div<{ $hint: string }>`
  flex-grow: 1;
  width: 100%;
  max-width: 670px;
  position: relative;
  overflow: ${({ $hint }) => ($hint === 'pulsate' ? 'visible' : 'hidden')};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SViewportWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const SErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SCorrectWord = styled.p`
  font-weight: bold;
  font-size: 2.375rem;
  color: #fbfcff;
`;

const SHandWrapper = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 2;
  left: 40%;
  top: 40%;
`;
