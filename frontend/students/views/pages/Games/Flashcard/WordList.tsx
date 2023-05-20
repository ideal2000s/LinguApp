import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { IPhrase } from 'students/models';
import styles from './WordList.module.scss';
import { Translate } from 'i18n';
import PhraseIcon from 'students/views/shared/components/PhraseIcon';
import { SvgAudioPlayer } from 'students/views/shared/components/MediaPlayer';

interface IProps {
  words: IPhrase[];
}
const WordList: React.FC<IProps> = ({ words }) => {
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={styles.wordListContainer}>
      <p className={styles.notice}>
        <Translate
          str="frontend.games.flashcard.keep_practice_to_learn_all_words"
          params={{ count: words.length }}
        />
      </p>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={styles.wordList}
      >
        {words.map((word) => (
          <motion.div variants={item} key={word.id} className={styles.wordItem}>
            <div className={styles.iconContainer}>
              <PhraseIcon
                imageUrl={word.imageURL}
                colorRequired
                animationUrl={word.animationURL}
                text=""
                width="40px"
                height="40px"
              />
            </div>
            <div>
              <div className={styles.origin}>{word.body}</div>
              <div className={styles.translation}>{word.wordTranslation}</div>
            </div>
            {word.audioURL && (
              <div className={styles.audio}>
                <SSvgAudioPlayer
                  src={word.audioURL}
                  color="#ffffff40"
                  progressColor="#ffffff"
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WordList;

const SSvgAudioPlayer = styled(SvgAudioPlayer)`
  width: 30px;
  height: 30px;
`;
