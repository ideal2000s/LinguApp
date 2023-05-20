import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { ITaskSession, tTaskSessionAnswer } from './session';

export interface ICheckFillInBlanksTask
  extends ILessonTaskBase<'Tasks::FillInBlanks', ICheckFillInBlanksItem> {
  videoURL: string | null;
}
export interface ICheckFillInBlanksItem
  extends ILessonTaskItemBase<'TaskItems::FillInBlanks'> {
  question: string;
  solution: string[][];
}

//ANSWER TYPES

export interface IFillInBlanksTaskSession
  extends ITaskSession<IFillInBlanksTaskItemSession> {}
export interface IFillInBlanksTaskItemSession extends IBaseTaskItemSession {
  answers: Array<string>;
}

export type tFillInBlanksAnswer = tTaskSessionAnswer<IFillInBlanksTaskItemSession>;
