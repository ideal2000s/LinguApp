import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

interface IWord {
  body: string;
  wordClass: string;
  image: string | null;
}

export interface IPlayAuditionTask
  extends ILessonTaskBase<'Tasks::Audition', IPlayAuditionItem> {
  instruction: string | null;
}
export interface IPlayAuditionItem extends ILessonTaskItemBase<'TaskItems::Audition'> {
  start: number;
  startString: string;
  correctWord: IWord;
  words: IWord[];
}

export interface IAuditionTaskSession extends ITaskSession<IAuditionTaskItemSession> {}
export interface IAuditionTaskItemSession extends IBaseTaskItemSession {}

export type tAuditionAnswer = tTaskSessionAnswer<IAuditionTaskItemSession>;
