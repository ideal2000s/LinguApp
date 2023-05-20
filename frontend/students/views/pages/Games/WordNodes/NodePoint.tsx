import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './NodeStage.module.scss';
import { useGameAudioPlayer } from '../common/helpers';

export interface IProps {
  status: '' | 'success' | 'error' | 'selected' | 'potential';
  left: number;
  top: number;
  text: string;
  onAnimationComplete: () => void;
  onErrorAnimationComplete?: () => void;
}

const NodePoint: React.FC<IProps> = ({
  status,
  left,
  top,
  text,
  onAnimationComplete,
  onErrorAnimationComplete = () => {}
}) => {
  const { playCorrectSound, playIncorrectSound } = useGameAudioPlayer();
  useEffect(() => {
    if (status === 'error') playIncorrectSound();
    if (status === 'success') playCorrectSound();
  }, [status, playCorrectSound, playIncorrectSound]);
  return (
    <div>
      {status === 'error' ? (
        <motion.div
          className={styles.node}
          style={{ left, top }}
          onAnimationComplete={onErrorAnimationComplete}
          animate={{
            rotate: [0, 45, -45, 0],
            x: ['-50%', '-50%', '-50%', '-50%'],
            y: ['-50px', '-50px', '-50px', '-50px']
          }}
        >
          {text}
        </motion.div>
      ) : (
        <div className={styles.node} style={{ left, top }}>
          {text}
        </div>
      )}
      {status === 'success' || status === 'error' ? (
        <motion.div
          className={`${styles.nodeCircle} ${
            status === 'success' ? `${styles.selected} ${styles.lastOne}` : ''
          }`}
          animate={{
            scale: [1, 1.7, 1],
            x: ['-50%', '-50%', '-50%'],
            y: ['-50%', '-50%', '-50%']
          }}
          style={{ left, top }}
          onAnimationComplete={onAnimationComplete}
        >
          <div className={styles.whiteOverlay}></div>
          {status === 'error' ? (
            <motion.div
              animate={{ borderColor: ['#d9534f', '#d9534f', '#FBFCFF'] }}
              className={styles.nodeWhiteCircle}
            ></motion.div>
          ) : (
            <div className={styles.nodeWhiteCircle}></div>
          )}
        </motion.div>
      ) : (
        <div className={`${styles.nodeCircle} ${styles[status]}`} style={{ left, top }}>
          <div className={styles.whiteOverlay}></div>
          <div className={styles.nodeWhiteCircle}></div>
        </div>
      )}
    </div>
  );
};

export default NodePoint;
