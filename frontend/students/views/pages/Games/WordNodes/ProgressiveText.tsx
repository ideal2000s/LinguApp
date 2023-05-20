import React from 'react';
import { motion } from 'framer-motion';

interface IProps {
  syllables: string[];
}

const ProgressiveText: React.FC<IProps> = ({ syllables }) => {
  return (
    <>
      {syllables.map((syllable, seq) => (
        <motion.span key={seq} initial="before" animate="after" variants={pieceVariants}>
          {Array.from(syllable).map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </>
  );
};

export default ProgressiveText;

// Add staggering effect to the children of the container
const pieceVariants = {
  before: {},
  after: { transition: { staggerChildren: 0.06 } }
};
// Variants for animating each letter
const letterVariants = {
  before: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 16,
      stiffness: 200
    }
  },
  after: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 16,
      stiffness: 200
    }
  }
};
