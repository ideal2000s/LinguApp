import { ITaskSession, tTaskSessionAnswer } from './session';
import { IBaseTaskItemSession, ILessonTaskBase, ILessonTaskItemBase } from './base';
import { IGameRoundAnswer, tGameType } from '../games';

export interface IWordGamesTask
  extends ILessonTaskBase<'Tasks::WordGames', IWordGamesItem> {}
export interface IWordGamesItem extends ILessonTaskItemBase<'TaskItems::WordGames'> {
  gameType: tGameType;
  enabled: boolean;
}

export interface IWordGamesTaskSession extends ITaskSession<IWordGamesTaskItemSession> {}

// ANSWER TYPES
export interface IWordGamesTaskItemSession extends IBaseTaskItemSession {
  timeSpent: number;
  rounds: IGameRoundAnswer[];
}
export type tWordGamesAnswer = tTaskSessionAnswer<IWordGamesTaskItemSession>;
