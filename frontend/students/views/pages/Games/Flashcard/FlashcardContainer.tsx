import React, { useMemo } from 'react';
import _sampleSize from 'lodash/sampleSize';
import Flashcard from './Flashcard';
import { IGameContainerProps } from '..';

const MAX_WORDS_NUMBER = 12;

const FlashcardContainer: React.FC<IGameContainerProps> = ({
  phrases,
  maxRounds,
  onRoundComplete,
  onNext,
  onExit
}) => {
  const words = useMemo(() => _sampleSize([...phrases], maxRounds || MAX_WORDS_NUMBER), [
    maxRounds,
    phrases
  ]);

  return words.length ? (
    <Flashcard
      words={words}
      onRoundComplete={onRoundComplete}
      onNext={onNext}
      onExit={onExit}
    />
  ) : null;
};

export default FlashcardContainer;
