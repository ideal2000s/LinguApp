import React from 'react';
import { motion } from 'framer-motion';
import styles from './NodeStage.module.scss';
import { Translate } from 'i18n';

interface IProps {
  onComplete: () => void;
}

const TutorialExplainer: React.FC<IProps> = ({ onComplete }) => {
  return (
    <>
      <p className={styles.tutorialHeadline}>
        <Translate str="frontend.games.word_nodes.match_letters_to_form_word" />
      </p>
      <motion.p onTap={onComplete} className={styles.skipButton}>
        <Translate str="frontend.games.skip_tutorial" />
      </motion.p>
    </>
  );
};

export default TutorialExplainer;
