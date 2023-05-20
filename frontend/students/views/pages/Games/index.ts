import { FC } from 'react';
import { IGameRoundAnswer, IPhrase, tGameDifficulty, tGameType } from 'students/models';
import MatchWordContainer from 'students/views/pages/Games/MatchWord';
import WordNodesContainer from 'students/views/pages/Games/WordNodes';
import FlashcardContainer from './Flashcard';
import WordWaterfallContainer from './WordWaterfall';
export interface IGameContainerProps {
  phrases: IPhrase[];
  difficulty?: tGameDifficulty;
  maxRounds?: number;
  showTutorial?: boolean;
  onExit?: () => void;
  onNext?: () => void;
  onRoundComplete?: (answer: IGameRoundAnswer) => void;
}
interface IGameContainerComponent<T> extends FC<T> {}

export const gamesMap = new Map<tGameType, IGameContainerComponent<IGameContainerProps>>([
  ['flashcard', FlashcardContainer],
  ['waterfall', WordWaterfallContainer],
  ['match', MatchWordContainer],
  ['nodes', WordNodesContainer]
]);

// test game config
// TODO: Take it from backend in future
interface IGameConfig {
  maxRounds: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const gamesConfigMap = new Map<tGameType, IGameConfig>([
  ['flashcard', { maxRounds: 30, difficulty: 'easy' }],
  ['waterfall', { maxRounds: 4, difficulty: 'easy' }],
  ['match', { maxRounds: 6, difficulty: 'easy' }],
  ['nodes', { maxRounds: 6, difficulty: 'easy' }]
]);

export { default } from './TaskGames';
