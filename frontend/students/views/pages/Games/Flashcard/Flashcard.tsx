import React, { useEffect, useState } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import styled from 'styled-components';
import cn from 'classnames';
import { IGameRoundAnswer, IPhrase } from 'students/models';
import { Translate, t } from 'i18n';
import PhraseIcon from 'students/views/shared/components/PhraseIcon';
import CircleButton from 'students/views/shared/components/CircleButton';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import { Container } from './styled';
import { SvgAudioPlayer } from 'students/views/shared/components/MediaPlayer';
import { styleInnerButton } from 'students/views/shared/components/ButtonGeneral/ButtonGeneral';
import { customMediaQuery } from 'students/views/shared/styled';
import styles from './Flashcard.module.scss';
import WordList from './WordList';
import arrowIcon from './assets/arrow.svg';
import hintAnimation from './assets/hint-animation.json';
import CloseButton from '../common/CloseButton';
import commonStyles from '../common/gameStyles.module.scss';
import { useHintVisibility, useMobileVhHack } from '../common/helpers';
import HandHint from '../common/HandHint';
import FrequencyIndicator from './FrequencyIndicator';
import GameStartScreen from '../common/GameStartScreen';
import GameFinishButton from '../common/GameFinishButton';

const PAN_DELTA = 100;

interface IProps {
  words: IPhrase[];
  onRoundComplete?: (answer: IGameRoundAnswer) => void;
  onExit?: () => void;
  onNext?: () => void;
}
const Flashcard: React.FC<IProps> = ({
  words,
  onRoundComplete = () => {},
  onNext = () => {},
  onExit
}) => {
  useMobileVhHack();
  const controls = useAnimation();
  const [stage, setStage] = useState<'start' | 'inGame' | 'finished'>('start');
  const [round, setRound] = useState(0);
  const [hintVisible, updateLastInteractionTime, shaking] = useFlashcardHint(round === 0);
  const phrase = words[round];

  const hasImage = phrase.imageURL || phrase.animationURL;
  const canGoNext = round < words.length;
  const canGoPrev = round > 0;
  const variants = {
    initial: {
      rotate: -8.72,
      opacity: 0.2
    },
    enter: {
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    next: {
      x: '-100%',
      rotate: 20,
      opacity: 0,
      transition: { duration: 0.5 }
    },
    prev: {
      x: '100%',
      rotate: 20,
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    if (stage == 'inGame') controls.start('enter');
  }, [round, controls, phrase, stage]);

  const goNext = () => {
    if (canGoNext) {
      updateLastInteractionTime();
      controls.start('next').then(() => {
        onRoundComplete({
          word: phrase.body,
          solved: true
        });
        if (round === words.length - 1) {
          setStage('finished');
        } else {
          setRound(round + 1);
        }
      });
    }
  };

  const goPrev = () => {
    if (canGoPrev) {
      updateLastInteractionTime();
      controls.start('prev').then(() => {
        setRound(round - 1);
      });
    }
  };

  const onPanEnd = (event: any, info: PanInfo) => {
    updateLastInteractionTime();
    if (info.offset.x < -PAN_DELTA) goNext();
    if (info.offset.x > PAN_DELTA) goPrev();
  };

  return (
    <Container className={`${styles.container} ${commonStyles.height100Vh}`}>
      {onExit && (
        <div style={{ position: 'absolute', width: '100%', top: 0, left: 0 }}>
          <SCloseButton onClick={onExit} />
        </div>
      )}

      {stage === 'start' && (
        <GameStartScreen
          heading={t('frontend.games.flashcard.check_out_new_words')}
          onStart={() => setStage('inGame')}
        />
      )}

      {stage === 'finished' && (
        <>
          <div className={styles.wordListContainer}>
            <WordList words={words} />
          </div>
          <div className={styles.nextButtonContainer}>
            <GameFinishButton
              onClickAnimationComplete={onNext}
              title={t('frontend.games.flashcard.buttons.finish')}
            />
          </div>
        </>
      )}

      {stage === 'inGame' && (
        <>
          <div className={styles.header}>
            <p>
              <Translate str="frontend.games.flashcard.check_out_new_words" />
            </p>
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.buttonContainer}>
              <SPrevButton
                title={t('frontend.games.flashcard.buttons.previous')}
                iconUrl={arrowIcon}
                disabled={!canGoPrev}
                onClick={goPrev}
                size="56px"
                shadowColor="none"
                bgColor="transparent"
                iconColor="#fff"
              />
              <SNextButton
                title={t('frontend.games.flashcard.buttons.next')}
                iconUrl={arrowIcon}
                disabled={!canGoNext}
                onClick={goNext}
                size="56px"
                shadowColor="none"
                bgColor="transparent"
                iconColor="#fff"
              />
            </div>
            <div className={styles.nextCard}></div>
            <motion.div
              key={round}
              className={cn(styles.card, { [styles.shaking]: shaking })}
              initial="initial"
              animate={controls}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onPanEnd={onPanEnd}
              variants={variants}
            >
              <div>
                <SPhraseIcon
                  imageUrl={phrase.imageURL}
                  colorRequired
                  animationUrl={phrase.animationURL}
                  iconClassName="flashcard-cardIcon"
                  text=""
                />
                {!!phrase.audioURL && (
                  <div className={cn(styles.audio, { [styles.hasImage]: hasImage })}>
                    <SSvgAudioPlayer
                      src={phrase.audioURL}
                      autoplay
                      autoPlayDelay={round == 0 ? 300 : 0}
                      color="#0094c540"
                      progressColor="#0094c5"
                    />
                  </div>
                )}
                <div>
                  <p className={styles.origin}>{phrase.body}</p>
                  <p className={styles.translation}>{phrase.wordTranslation}</p>
                </div>
              </div>

              <div>
                <FrequencyIndicator frequency={phrase.frequency} />
              </div>

              {hintVisible && (
                <HandHint top="50%" left="40%" animationData={hintAnimation} />
              )}
            </motion.div>
          </div>
          <div className={styles.progressBar}>
            <DashedPagination itemsNumber={words.length} currentIndex={round} />
          </div>
        </>
      )}
    </Container>
  );
};

export default Flashcard;

const SHAKE_TIMEOUT = 6000;

const useFlashcardHint = (shouldAppear = true): [boolean, () => void, boolean] => {
  const [hintVisible, updateLastInteractionTime] = useHintVisibility(shouldAppear);
  const [shaking, setShaking] = useState(false);
  useEffect(() => {
    if (!hintVisible) {
      setShaking(false);
      return;
    }

    const timer = window.setTimeout(() => setShaking(true), SHAKE_TIMEOUT);
    return () => {
      window.clearTimeout(timer);
    };
  }, [hintVisible]);
  return [hintVisible, updateLastInteractionTime, shaking];
};

const SPhraseIcon = styled(PhraseIcon)`
  display: flex;
  justify-items: stretch;
  align-items: stretch;
  padding: 10px;
  .flashcard-cardIcon {
    min-width: 100px !important;
    min-height: 100px !important;
    height: 100%;

    ${customMediaQuery('tablet')} {
      min-width: 160px !important;
      min-height: 160px !important;
    }
  }
`;

const SCloseButton = styled(CloseButton)`
  position: relative;
  max-width: 1000px;
  margin: auto;
`;

const SSvgAudioPlayer = styled(SvgAudioPlayer)`
  width: 52px;
  height: 52px;
`;

const SNextButton = styled(CircleButton)`
  ${styleInnerButton()} {
    border: 2px solid #fff;
    color: #fff;
  }
`;

const SPrevButton = styled(SNextButton)`
  transform: rotate(180deg);
`;
