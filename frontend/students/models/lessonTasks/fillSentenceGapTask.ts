import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

export interface IFillSentenceGapTask
  extends ILessonTaskBase<'Tasks::FillGap', IFillSentenceGapItem> {
  instruction: string | null;
}

export interface IFillSentenceGapItem extends ILessonTaskItemBase<'TaskItems::FillGap'> {
  statement: string;
  answers: string[][];
  solution: string[];
}

export interface IFillSentenceGapTaskSession
  extends ITaskSession<IFillSentenceGapTaskItemSession> {}

export interface IFillSentenceGapTaskItemSession extends IBaseTaskItemSession {
  answers: Array<string>;
}

export type tFillSentenceGapAnswer = tTaskSessionAnswer<IFillSentenceGapTaskItemSession>;
