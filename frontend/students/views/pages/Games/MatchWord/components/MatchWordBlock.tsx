import React from 'react';
import { motion, PanInfo, TapInfo } from 'framer-motion';
import cn from 'classnames';
import random from 'lodash/random';
import UrlIcon from 'students/views/shared/components/UrlIcon/UrlIcon';
import PhraseIcon from 'students/views/shared/components/PhraseIcon';
import styles from '../MatchWord.module.scss';
import speakerIcon from '../assets/speaker.svg';
import { IWordPosition } from './MatchWordViewport';

interface IProps {
  isHovering: boolean;
  isSelected: boolean;
  animateTarget: string;
  sequence: number;
  word: IWordPosition;
  onItemDrag: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    index: number
  ) => void;
  onItemDragStart: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    index: number
  ) => void;
  onItemDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    index: number
  ) => void;
  onItemTap: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: TapInfo,
    index: number
  ) => void;
  onItemAnimationComplete: (index: number) => void;
}

const MatchWordBlock: React.FC<IProps> = ({
  isHovering,
  isSelected,
  animateTarget,
  sequence,
  word,
  onItemDrag,
  onItemDragStart,
  onItemDragEnd,
  onItemTap,
  onItemAnimationComplete
}) => {
  const variants = {
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, delay: random(0.5, 1, true) }
    },
    correct1: {
      opacity: 0,
      transitionEnd: { display: 'none' }
    },
    correct2: {
      opacity: 0,
      clipPath: [`circle(75%)`, `circle(0%)`],
      transition: { duration: 1 },
      transitionEnd: { display: 'none' }
    },
    incorrect1: {
      x: 0,
      y: 0,
      transition: { duration: 0.5 }
    },
    incorrect2: {
      rotate: [0, 5, -5, 0],
      x: [0, 10, -10, 0]
    }
  };
  const handleDrag = (e: MouseEvent | TouchEvent | PointerEvent, i: PanInfo) => {
    onItemDrag(e, i, sequence);
  };
  const handleDragStart = (e: MouseEvent | TouchEvent | PointerEvent, i: PanInfo) => {
    onItemDragStart(e, i, sequence);
  };
  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, i: PanInfo) => {
    onItemDragEnd(e, i, sequence);
  };
  const handleTap = (e: MouseEvent | TouchEvent | PointerEvent, i: TapInfo) => {
    onItemTap(e, i, sequence);
  };
  const handleAnimationComplete = () => {
    if (animateTarget) onItemAnimationComplete(sequence);
  };
  let blockType: 'word' | 'audio' | 'picture' = 'word';
  if (!word.origin) {
    if (word.phrase.audioURL) {
      blockType = 'audio';
    } else if (word.phrase.imageURL || word.phrase.animationURL) {
      blockType = 'picture';
    }
  }
  return (
    <motion.div
      drag
      dragMomentum={false}
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      ref={(el) => (word.ref = el)}
      initial={{ y: 10, scale: 0.8, opacity: 0 }}
      animate={animateTarget}
      variants={variants}
      onAnimationComplete={handleAnimationComplete}
      data-type={blockType}
      className={cn(styles.wordContainer, {
        [styles.wordOrigin]: word.origin,
        [styles.hovering]: isHovering,
        [styles.selected]: isSelected,
        [styles.correct]: animateTarget == 'correct2',
        [styles.incorrect]: animateTarget == 'incorrect2'
      })}
      style={{
        left: `${word.area.percentX}%`,
        top: `${word.area.percentY}%`
      }}
    >
      {blockType === 'word' ? (
        <span>{word.origin ? word.phrase.body : word.phrase.wordTranslation}</span>
      ) : blockType === 'picture' ? (
        <PhraseIcon
          imageUrl={word.phrase.imageURL}
          colorRequired={word.phrase.colorRequired}
          animationUrl={word.phrase.animationURL}
          text={word.phrase.wordTranslation}
          width="100px"
          height="100px"
        />
      ) : (
        <UrlIcon url={speakerIcon} height="42px" width="42px" />
      )}
    </motion.div>
  );
};

export default MatchWordBlock;
