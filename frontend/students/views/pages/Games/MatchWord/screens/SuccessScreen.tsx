import React from 'react';
import { motion } from 'framer-motion';
import { Translate } from 'i18n';
import { SuccessText } from '../components/styled';
import styles from '../MatchWord.module.scss';
import GameFinishButton from '../../common/GameFinishButton';

interface IProps {
  onNextClick?: () => void;
}

const SuccessScreen: React.FC<IProps> = ({ onNextClick }) => {
  const nextClickHandler = () => {
    onNextClick && onNextClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={styles.leaderboardContainer}
    >
      <div className={styles.nextButtonContainer}>
        <SuccessText>
          <Translate str="frontend.games.finished.go_to_next_exercise" />
        </SuccessText>
        <GameFinishButton onClickAnimationComplete={nextClickHandler} />
      </div>
    </motion.div>
  );
};

export default SuccessScreen;
