import { IBaseTaskItemSession, ILessonTaskBase, ILessonTaskItemBase } from './base';
import { ITaskSession, tTaskSessionAnswer } from './session';

export interface IMinimalPairsTask
  extends ILessonTaskBase<'Tasks::SelectVideo', IMinimalPairsTaskItem> {
  instruction: string | null;
}

export interface IMinimalPairsTaskItem
  extends ILessonTaskItemBase<'TaskItems::SelectVideo'> {
  question: string;
  position: number;
  videoURL: string;
  options: IMinimalPairsTaskItemOption[];
}

export interface IMinimalPairsTaskItemOption {
  id: number;
  answer: string;
  correct: boolean;
}

export interface IMinimalPairsTaskSession
  extends ITaskSession<IMinimalPairsTaskItemSession> {}

export interface IMinimalPairsTaskItemSession extends IBaseTaskItemSession {}

export type tMinimalPairsAnswer = tTaskSessionAnswer<IMinimalPairsTaskItemSession>;
