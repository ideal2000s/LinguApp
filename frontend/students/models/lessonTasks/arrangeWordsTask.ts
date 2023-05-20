import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

export interface IPlayArrangeWordsTask
  extends ILessonTaskBase<'Tasks::ArrangeWords', IPlayArrangeWordsItem> {
  instruction: string | null;
}
export interface IPlayArrangeWordsItem
  extends ILessonTaskItemBase<'TaskItems::ArrangeWords'> {
  words: string[];
  solution: string;
  description: string;
}

export interface IArrangeWordsTaskSession
  extends ITaskSession<IArrangeWordsTaskItemSession> {}
export interface IArrangeWordsTaskItemSession extends IBaseTaskItemSession {
  words: Array<string>;
}

export type tArrangeWordsAnswer = tTaskSessionAnswer<IArrangeWordsTaskItemSession>;
