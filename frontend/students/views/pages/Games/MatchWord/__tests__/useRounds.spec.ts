import { renderHook } from '@testing-library/react-hooks';
import fill from 'lodash/fill';
import { IPhrase } from 'students/models';
import useRounds from '../hooks/useRounds';
import { phrasesData } from '../../phrasesMockData';

const renderAmount = (amount: number): number[] => {
  const phrasesMock = generateTestPhrases(amount);
  const { result } = renderHook(() => useRounds(phrasesMock));
  const rounds = result.current;
  if (!rounds) return [];
  return rounds.map((round) => round?.phrases.length);
};

const expectPhrasesAmount = (totalPhrases: number, expected: number[]): void => {
  const phrasesPerRound = renderAmount(totalPhrases);
  expect(phrasesPerRound).toStrictEqual(expected);
};

describe('useRounds', () => {
  it('Case: 35 phrases, expected - [6, 6, 6, 6, 6]', () => {
    expectPhrasesAmount(35, [6, 6, 6, 6, 6]);
  });
  it('Case: 30 phrases, expected - [6, 6, 6, 6, 6]', () => {
    expectPhrasesAmount(30, [6, 6, 6, 6, 6]);
  });
  it('Case: 29 phrases, expected - [5, 6, 6, 6, 6]', () => {
    expectPhrasesAmount(29, [5, 6, 6, 6, 6]);
  });
  it('Case: 28 phrases, expected - [5, 5, 6, 6, 6]', () => {
    expectPhrasesAmount(28, [5, 5, 6, 6, 6]);
  });
  it('Case: 19 phrases, expected - [3, 4, 4, 4, 4]', () => {
    expectPhrasesAmount(19, [3, 4, 4, 4, 4]);
  });
  it('Case: 18 phrases, expected - [3, 3, 4, 4, 4]', () => {
    expectPhrasesAmount(18, [3, 3, 4, 4, 4]);
  });
  it('Case: 16 phrases, expected - [3, 3, 3, 3, 4]', () => {
    expectPhrasesAmount(16, [3, 3, 3, 3, 4]);
  });
  it('Case: 13 phrases, expected - [3, 3, 3, 4]', () => {
    expectPhrasesAmount(13, [3, 3, 3, 4]);
  });
  it('Case: 11 phrases, expected - [3, 4, 4]', () => {
    expectPhrasesAmount(11, [3, 4, 4]);
  });
  it('Case: 9 phrases, expected - [3, 3, 3]', () => {
    expectPhrasesAmount(9, [3, 3, 3]);
  });
  it('Case: 6 phrases, expected - [3, 3]', () => {
    expectPhrasesAmount(6, [3, 3]);
  });
  it('Case: 5 phrases, expected - [5]', () => {
    expectPhrasesAmount(5, [5]);
  });
  it('Case: 0 phrases, expected - []', () => {
    expectPhrasesAmount(0, []);
  });
});

function generateTestPhrases(amount: number): IPhrase[] {
  return fill(new Array<IPhrase>(amount), phrasesData[0]);
}
