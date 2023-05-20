import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import random from 'lodash/random';
import { motion, AnimatePresence, useAnimation, TapInfo } from 'framer-motion';
import { IGameRoundAnswer, tGameDifficulty, tWordWaterfallData } from 'students/models';
import { customMediaQuery } from 'students/views/shared/styled';
import PhraseIcon from 'students/views/shared/components/PhraseIcon';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import HandHint from 'students/views/pages/Games/common/HandHint';
import Picture from 'students/views/shared/components/Picture';
import { t, Translate } from 'i18n';
import {
  useMobileVhHack,
  useGameAudioPlayer,
  useHintVisibility
} from '../common/helpers';
import {
  BackgroundDiv,
  BackgroundImage,
  Container,
  StretchingDiv,
  wordPadding
} from './styled';
import { audioItems } from './assets/audioItems';
import CloseButton from '../common/CloseButton';
import GameCloseButton from '../common/GameCloseButton';
import GameStartScreen from '../common/GameStartScreen';
import GameFinishButton from '../common/GameFinishButton';
import hintAnimation from './assets/hint-animation.json';
import background from './assets/bg-image.png';
import backgroundWebp from './assets/bg-image.webp';

export interface IProps {
  rounds: tWordWaterfallData;
  difficulty?: tGameDifficulty;
  onRoundComplete?: (answer: IGameRoundAnswer) => void;
  onFinish?: () => void;
  onExit?: () => void;
}

const themes = ['blue', 'orange', 'yellow', 'pink', 'green'];
const unShuffled = [-2.5, -1.5, -0.5, 0.5, 1.5];
const duration: { [key: string]: number } = { easy: 10, medium: 8, hard: 6 };
const WORD_ANIMATION_DELAY = 2;
const BACKGROUND_STEP = 200;

const WordWaterfall: React.FC<IProps> = ({
  rounds,
  difficulty = 'easy',
  onRoundComplete = () => {},
  onFinish = () => {},
  onExit
}) => {
  const { playCorrectSound, playIncorrectSound } = useGameAudioPlayer(audioItems);
  useMobileVhHack();
  const autoSkipTimeout = 1500;
  const bgControls = useAnimation();
  const controls = useAnimation();
  const [round, setRound] = useState(0);
  const [theme, setTheme] = useState('blue');
  const [stage, setStage] = useState<
    'start' | 'inGame' | 'finished' | 'timeout' | 'wrong'
  >('start');
  const [hintVisible, updateLastInteractionTime] = useHintVisibility(round === 0);

  const roundData = rounds[round];

  const goNextRound = useCallback(
    (returnCallback = false) => {
      bgControls.start({
        y: BACKGROUND_STEP * (round + 1),
        transition: { ease: [0.5, 1, 0.89, 1], duration: 3 }
      });
      const callback =
        round < rounds.length - 1
          ? () => {
              setRound(round + 1);
              setStage('inGame');
            }
          : () => setStage('finished');
      if (returnCallback) {
        return callback;
      }
      ReactDOM.unstable_batchedUpdates(() => {
        callback();
      });
      return null;
    },
    [bgControls, rounds.length, round]
  );

  useEffect(() => {
    if (stage === 'wrong') {
      const timer1 = window.setTimeout(() => goNextRound(), autoSkipTimeout);
      return () => clearTimeout(timer1);
    }
    return () => null;
  }, [stage, goNextRound]);

  const shuffled = useMemo(
    () =>
      unShuffled
        .map((a) => ({ sort: Math.random() + round, value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value),
    [round]
  );

  const [containerWidth, setContainerWidth] = useState(0);
  const backgroundEl = useRef<HTMLDivElement>(null);
  const circleEl = useRef<HTMLDivElement>(null);
  const containerElRef = useCallback((node) => {
    if (node !== null) {
      setContainerWidth(node.offsetWidth);
    }
  }, []);

  if (!rounds.length) return null;

  const { question, list: words } = roundData;
  const randomDurations = words.map(() => duration[difficulty] + random(-2, 2));
  const boxVariants = {
    dropping: (index: number) => ({
      opacity: [0, 1, 1, 0],
      top: ['0%', '7%', '95%', '100%'],
      scale: [1, 1, 1, 2],
      transition: {
        delay: WORD_ANIMATION_DELAY + index * (duration[difficulty] / 10),
        duration: randomDurations[index],
        times: [0, 0.1, 0.95, 1],
        ease: 'linear'
      }
    })
  };

  const handleRoundComplete = (answer = '') => {
    const { answer: correctAnswer } = roundData;
    onRoundComplete({
      word: correctAnswer,
      solved: answer === correctAnswer
    });
  };

  const handleNext = () => {
    handleRoundComplete();
    goNextRound();
  };

  const onWordClick = (e: any, info: TapInfo, word: string, buttonTheme: string) => {
    let newTheme = buttonTheme;
    if (newTheme === theme) [newTheme] = themes.filter((t) => t !== newTheme);
    e.target.classList.add('clicked');
    updateLastInteractionTime();

    handleRoundComplete(word);
    if (roundData.answer === word) {
      playCorrectSound();
      const center = {
        x:
          info.point.x -
          (backgroundEl.current?.getBoundingClientRect().left || 0) -
          document.documentElement.scrollLeft,
        y:
          info.point.y -
          (backgroundEl.current?.getBoundingClientRect().top || 0) -
          document.documentElement.scrollTop
      };
      const centerPosition = `${center.x}px ${center.y}px`;
      circleEl?.current?.classList.remove(...themes);
      circleEl?.current?.classList.add(newTheme);
      controls.set({ display: 'block' });
      controls.set({ clipPath: `circle(0px at ${centerPosition})` });
      controls
        .start({
          clipPath: [
            null,
            `circle(300px at ${centerPosition})`,
            `circle(1500px at ${centerPosition})`
          ],
          transition: { times: [0, 0.5, 1], duration: 1 }
        })
        .then(() => {
          controls.set({ display: 'none' });
          if (roundData.answer === word) {
            const callback = goNextRound(true);
            ReactDOM.unstable_batchedUpdates(() => {
              setTheme(newTheme);
              if (callback) callback();
            });
          }
        });
    } else {
      playIncorrectSound();
      setStage('wrong');
    }
  };

  const onWordDropped = (wordIndex: number) => {
    playIncorrectSound();
    if (wordIndex === words.length - 1) {
      handleRoundComplete();
      setStage('timeout');
    }
  };

  return (
    <Container style={{ height: '100vh' }} ref={containerElRef}>
      <BackgroundDiv>
        <StretchingDiv className={`gradient-background ${theme}`} ref={backgroundEl} />
        <CircleDiv className="circle-gradient" ref={circleEl} animate={controls} />
        <BackgroundImage
          $topIndent={rounds.length * BACKGROUND_STEP}
          animate={bgControls}
          as={motion.div}
        >
          <Picture lazy src={background} srcSet={backgroundWebp} />
        </BackgroundImage>
      </BackgroundDiv>
      {!!onExit && (
        <SHeaderWrapper>
          <CloseButton onClick={onExit} />
        </SHeaderWrapper>
      )}
      {stage === 'start' ? (
        <div className="foreground-wrapper">
          <GameStartScreen
            heading={t('frontend.games.word_waterfall.start_heading')}
            onStart={() => setStage('inGame')}
          />
        </div>
      ) : (
        <>
          <AnimatePresence>
            {stage === 'inGame' && roundData && (
              <motion.div
                className="foreground-wrapper"
                key={roundData.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="question-wrapper title-heading"
                  initial={{ top: '15%' }}
                  animate={{ top: '10%' }}
                  exit={{ top: '15%' }}
                  transition={{ duration: 0.5 }}
                >
                  <SPhraseIcon
                    text={question.text}
                    imageUrl={question.imageURL}
                    animationUrl={question.animationURL}
                    colorRequired={question.colorRequired}
                    iconClassName="waterfall-icon"
                  />
                </motion.div>
                <div className="words-wrapper">
                  {words.map(({ word, id: wordId }, i) => {
                    const buttonTheme = themes[i % themes.length];
                    let gap = 100;
                    if (containerWidth) gap = Math.min(gap, containerWidth / 2 / 2.5);
                    let offsetX = shuffled[i % unShuffled.length] * gap;
                    if (containerWidth) {
                      if (offsetX <= -containerWidth / 2 + 10) {
                        offsetX = -containerWidth / 2 + 10;
                      } else if (
                        offsetX + word.length * 10 + wordPadding.horizontal * 2 >
                        containerWidth / 2
                      ) {
                        offsetX =
                          containerWidth / 2 -
                          word.length * 10 -
                          wordPadding.horizontal * 2;
                      }
                    }
                    return (
                      <motion.div
                        className={`word-block ${buttonTheme}`}
                        key={wordId}
                        onTap={(e, info) => onWordClick(e, info, word, buttonTheme)}
                        variants={boxVariants}
                        custom={i}
                        animate="dropping"
                        style={{ left: offsetX }}
                        onAnimationComplete={() => onWordDropped(i)}
                      >
                        {word}
                        {hintVisible && roundData.answer === word && (
                          <HandHint top="0" left="30%" animationData={hintAnimation} />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
            {stage !== 'inGame' && (
              <motion.div
                key="center"
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0 }}
                className="foreground-wrapper"
              >
                {['wrong', 'timeout'].indexOf(stage) > -1 && (
                  <GameCloseButton onTap={() => goNextRound()} />
                )}
                {stage === 'finished' && (
                  <>
                    <p className="subtitle-heading final-message">
                      <Translate str="frontend.games.finished.go_to_next_exercise" />
                    </p>
                    <div style={{ margin: 0 }}>
                      <GameFinishButton onClickAnimationComplete={onFinish} />
                    </div>
                  </>
                )}
                {stage === 'wrong' && (
                  <>
                    <p style={{ margin: '16px 0' }} className="subtitle-heading">
                      {roundData.answer}
                    </p>
                    <p style={{ margin: 0 }} className="sub-heading">
                      {question.text}
                    </p>
                  </>
                )}
                {stage === 'timeout' && (
                  <p className="desc-heading">
                    <Translate str="frontend.games.word_waterfall.do_not_hesitate" />
                    <br />
                    <Translate str="frontend.games.word_waterfall.select_correct_translation" />
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="game-progress-bar">
            <DashedPagination
              itemsNumber={rounds.length}
              currentIndex={round}
              onNext={handleNext}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default WordWaterfall;

const CircleDiv = motion.custom(StretchingDiv);

const SPhraseIcon = styled(PhraseIcon)`
  .waterfall-icon {
    min-width: 100px !important;
    min-height: 100px !important;
    width: 100px !important;
    height: 100px !important;

    ${customMediaQuery('tablet')} {
      min-width: 160px !important;
      min-height: 160px !important;
      width: 160px !important;
      height: 160px !important;
    }
  }
`;

const SHeaderWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  position: relative;
`;
