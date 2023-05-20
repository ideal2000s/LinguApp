import { sampleSize } from 'lodash';
import { useMemo } from 'react';
import { IPhrase } from 'students/models';
import { IMatchWordRound } from 'students/views/pages/Games/MatchWord/MatchWord';

type tRounds = IMatchWordRound[] | null;

const MAX_ROUNDS_AMOUNT = 5;
const MIN_PHRASES_PER_ROUND = 3;
const MAX_PHRASES_PER_ROUND = 6;

export default function useRounds(phrases: IPhrase[]): tRounds {
  const shuffledPhrases = useMemo(() => sampleSize(phrases, phrases.length), [phrases]);

  const rounds = useMemo(() => {
    const intervals = divideIntoParts(shuffledPhrases.length, MAX_ROUNDS_AMOUNT, [
      MIN_PHRASES_PER_ROUND,
      MAX_PHRASES_PER_ROUND
    ]);
    const newRounds: tRounds = [];
    intervals.reduce((start, part) => {
      const end = start + part;
      newRounds.push({ phrases: shuffledPhrases.slice(start, end) });
      return end;
    }, 0);
    return newRounds;
  }, [shuffledPhrases]);

  return rounds;
}

type tInterval = [number, number];

function divideIntoParts(
  total: number,
  maxAmount: number,
  [min, max]: tInterval
): number[] {
  const amount = Math.min(maxAmount, Math.floor(total / min));
  const reminder = total - amount * min;
  const normalize = (part: number, index: number) => {
    const addition = index < reminder % amount ? 1 : 0;
    const newPart = part + Math.floor(reminder / amount) + addition;
    return newPart <= max ? newPart : max;
  };
  return new Array(amount).fill(min).map(normalize).reverse();
}
