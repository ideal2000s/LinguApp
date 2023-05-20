import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { t, Translate } from 'i18n';
import { IGameRoundAnswer, IWordNodesItem } from 'students/models';
import DashedPagination from 'students/views/shared/components/DashedPagination';
import { audioItems } from 'students/views/pages/Games/WordNodes/assets/audioItems';
import { customMediaQuery } from 'students/views/shared/styled';
import styles from './NodeGame.module.scss';
import NodeStage from './NodeStage';
import NodeTutorialStage from './NodeTutorialStage';
import CloseButton from '../common/CloseButton';
import commonStyles from '../common/gameStyles.module.scss';
import GameStartScreen from '../common/GameStartScreen';
import { Container, SuccessText } from './styled';
import { useGameAudioPlayer, useMobileVhHack } from '../common/helpers';
import GameFinishButton from '../common/GameFinishButton';

interface IProps {
  questions: IWordNodesItem[];
  showTutorial?: boolean;
  onRoundComplete?: (answer: IGameRoundAnswer) => void;
  onFinish?: () => void;
  onExit?: () => void;
}
const NodeGame: React.FC<IProps> = ({
  questions,
  showTutorial = true,
  onRoundComplete = () => {},
  onFinish = () => {},
  onExit
}) => {
  useGameAudioPlayer(audioItems);
  useMobileVhHack();
  const [score, setScore] = useState<'start' | 'inGame' | 'finished'>('start');
  const [round, setRound] = useState(0);
  const questionList: IWordNodesItem[] = questions.slice();
  if (showTutorial)
    questionList.unshift({ question: 'libro', list: ['bo', 'ok'], answer: 'book' });
  const { question, list: nodes, answer, phrase } = questionList[round];

  const onStageComplete = () => {
    phrase &&
      onRoundComplete({
        word: phrase.body,
        solved: true
      });
    if (round < questionList.length - 1) {
      setRound(round + 1);
    } else {
      setScore('finished');
    }
  };

  return (
    <Container className={`${styles.gameContainer} ${commonStyles.height100Vh}`}>
      {!!onExit && (
        <SHeaderWrapper>
          <CloseButton onClick={onExit} />
        </SHeaderWrapper>
      )}
      {score === 'start' ? (
        <GameStartScreen
          heading={t('frontend.games.word_nodes.match_letters_to_form_word')}
          onStart={() => setScore('inGame')}
        />
      ) : (
        <AnimatePresence>
          {score === 'inGame' && (
            <motion.div
              className={styles.stageContainer}
              key={round} // eslint-disable-line react/no-array-index-key
              initial={{ opacity: 0, x: round > 0 ? 300 : 0, rotate: round > 0 ? 15 : 0 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: round > 0 ? 0.1 : 1 }}
              transition={{ duration: 0.7 }}
            >
              {showTutorial && round === 0 ? (
                <NodeTutorialStage
                  question={question}
                  nodes={nodes}
                  answer={answer}
                  onComplete={onStageComplete}
                />
              ) : (
                <NodeStage
                  question={question}
                  nodes={nodes}
                  answer={answer}
                  phrase={phrase}
                  onComplete={onStageComplete}
                />
              )}
            </motion.div>
          )}
          {score === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className={styles.resultContainer}
            >
              <SuccessText>
                <Translate str="frontend.games.finished.go_to_next_exercise" />
              </SuccessText>
              <GameFinishButton onClickAnimationComplete={onFinish} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {score === 'inGame' && (
        <SPaginationContainer>
          <DashedPagination
            itemsNumber={questionList.length}
            currentIndex={round}
            onNext={onStageComplete}
          />
        </SPaginationContainer>
      )}
    </Container>
  );
};

export default NodeGame;

const SHeaderWrapper = styled.div`
  max-width: 1000px;
  margin: auto;
  position: relative;
`;

const SPaginationContainer = styled.div`
  position: absolute;
  z-index: 7;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);

  ${customMediaQuery('tablet')} {
    bottom: 22px;
  }
`;
