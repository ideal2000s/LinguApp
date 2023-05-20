export * from './wordWaterfall';
export * from './wordNodes';

export type tGameType = 'flashcard' | 'waterfall' | 'match' | 'nodes';
export type tGameDifficulty = 'easy' | 'medium' | 'hard';

export interface IGameRoundAnswer {
  word: string;
  solved: boolean;
}
export interface IGameAnswer {
  gameType: tGameType;
  roundAnswers: IGameRoundAnswer[];
}
export type tGameAnswers = IGameAnswer[];
