import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { t } from 'i18n';
import { audioItems } from 'students/views/pages/Games/MatchWord/assets/audioItems';
import { IGameRoundAnswer, IPhrase } from 'students/models';
import { useMobileVhHack, useGameAudioPlayer } from '../common/helpers';
import styles from './MatchWord.module.scss';
import CloseButton from '../common/CloseButton';
import commonStyles from '../common/gameStyles.module.scss';
import TimeoutScreen from './screens/TimeoutScreen';
import SuccessScreen from './screens/SuccessScreen';
import { Container, SPaginationContainer } from './components/styled';
import GameStartScreen from '../common/GameStartScreen';
import MatchWordViewport, { IWordAnswer } from './components/MatchWordViewport';
import DashedPagination from 'students/views/shared/components/DashedPagination';

export interface IMatchWordRound {
  phrases: IPhrase[];
}

type tGameStage = 'start' | 'inGame' | 'timeout' | 'finish';

interface IProps {
  rounds: IMatchWordRound[];
  difficulty?: 'easy' | 'medium' | 'hard';
  onRoundComplete?: (answer: IGameRoundAnswer) => void;
  onFinish?: () => void;
  onExit?: () => void;
}

const MatchWord: React.FC<IProps> = ({
  rounds,
  difficulty = 'easy',
  onRoundComplete = () => {},
  onFinish = () => {},
  onExit
}) => {
  useGameAudioPlayer(audioItems);
  useMobileVhHack();

  const [round, setRound] = useState(0);
  const { phrases } = rounds[round];
  const [gameStage, setGameStage] = useState<tGameStage>('start');
  const duration: { [key: string]: number } = {
    easy: phrases.length * 6,
    medium: phrases.length * 5,
    hard: phrases.length * 4
  };

  const handleRoundComplete = (answer: IWordAnswer) => {
    onRoundComplete({
      word: answer.word,
      solved: answer.solved
    });
  };

  const handleNextRound = () => {
    if (round + 1 < rounds.length) {
      setRound(round + 1);
    } else setGameStage('finish');
  };

  const onShadeFallDown = () => {
    setGameStage('timeout');
  };

  const restartRound = () => {
    setGameStage('inGame');
  };

  return (
    <Container className={`${styles.container} ${commonStyles.height100Vh}`}>
      {!!onExit && (
        <SHeaderWrapper>
          <CloseButton onClick={onExit} />
        </SHeaderWrapper>
      )}
      {gameStage === 'start' && (
        <GameStartScreen
          heading={t('frontend.games.match_word.start_heading')}
          onStart={() => setGameStage('inGame')}
        />
      )}
      {gameStage === 'inGame' && (
        <>
          <motion.div
            key={`${round}-timeout`}
            className={styles.shade}
            initial={{ clipPath: 'ellipse(150% 100% at 50% -100%)' }}
            animate={{ clipPath: 'ellipse(150% 100% at 50% 10%)' }}
            transition={{ duration: duration[difficulty] }}
            onAnimationComplete={onShadeFallDown}
          />
          <MatchWordViewport
            key={round}
            phrases={phrases}
            onRoundComplete={handleRoundComplete}
            onComplete={handleNextRound}
          />
          <SPaginationContainer>
            <DashedPagination
              itemsNumber={rounds.length}
              currentIndex={round}
              onNext={handleNextRound}
            />
          </SPaginationContainer>
        </>
      )}
      {gameStage === 'timeout' && <TimeoutScreen onNextClick={restartRound} />}
      {gameStage === 'finish' && <SuccessScreen onNextClick={onFinish} />}
    </Container>
  );
};

export default MatchWord;

const SHeaderWrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  top: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
`;
