import React, { useEffect, useState } from 'react';
import _shuffle from 'lodash/shuffle';
import _random from 'lodash/random';
import _uniq from 'lodash/uniq';
import _without from 'lodash/without';
import _uniqBy from 'lodash/uniqBy';
import _remove from 'lodash/remove';
import _sampleSize from 'lodash/sampleSize';
import { IPhrase, IWordWaterfallItem } from 'students/models';
import WordWaterfall from './WordWaterfall';
import { IGameContainerProps } from '..';

const WORDS_NUMBER_PER_ROUND = 5;
const MAX_ROUNDS_NUMBER = 8;

const WordWaterfallContainer: React.FC<IGameContainerProps> = ({
  phrases,
  difficulty,
  maxRounds,
  onRoundComplete,
  onNext = () => {},
  onExit
}) => {
  const [rounds, setRounds] = useState<IWordWaterfallItem[]>([]);
  useEffect(() => {
    setRounds(combineInRounds(phrases, maxRounds));
  }, [phrases, maxRounds]);

  if (!phrases.length) return null;

  return (
    <WordWaterfall
      rounds={rounds}
      difficulty={difficulty}
      onRoundComplete={onRoundComplete}
      onFinish={onNext}
      onExit={onExit}
    />
  );
};

export default WordWaterfallContainer;

function createAnswerVariants(
  phrases: IPhrase[],
  answer: IPhrase
): IWordWaterfallItem['list'] {
  const variants = _sampleSize([...phrases], WORDS_NUMBER_PER_ROUND);

  if (!variants.some(({ id }) => id === answer.id)) {
    variants.splice(0, 1, answer);
  }

  return _shuffle(variants.map(({ body, id }) => ({ word: body, id })));
}

function combineInRounds(phrases: IPhrase[], maxRounds: number = MAX_ROUNDS_NUMBER) {
  const icons: IPhrase[] = [];
  const texts: IPhrase[] = [];

  phrases.forEach((phrase) => {
    if (phrase.animationURL || phrase.imageURL) {
      icons.push(phrase);
    } else {
      texts.push(phrase);
    }
  });
  const result = [..._shuffle(icons), ..._shuffle(texts)];
  result.splice(maxRounds);

  const rounds: IWordWaterfallItem[] = result.map((word) => ({
    id: word.id,
    question: getQuestionFromPhrase(word),
    answer: word.body,
    list: createAnswerVariants(phrases, word)
  }));

  return rounds;
}

function getQuestionFromPhrase({
  wordTranslation,
  imageURL,
  animationURL,
  colorRequired
}: IPhrase): IWordWaterfallItem['question'] {
  return {
    text: wordTranslation,
    imageURL,
    animationURL,
    colorRequired
  };
}
