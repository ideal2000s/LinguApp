import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

export interface IMarkWordTask extends ILessonTaskBase<'Tasks::MarkWord', IMarkWordItem> {
  instruction: string | null;
}

export interface IMarkWordItemStatement {
  word: string;
  disabled: boolean;
  solution: boolean;
}

export interface IMarkWordItemWord {
  body: string;
  audioURL: string | null;
  imageURL: string | null;
  animationURL: string | null;
  wordClass: string;
  wordTranslation: string;
  colorRequired: boolean;
}

export interface IMarkWordItem extends ILessonTaskItemBase<'TaskItems::MarkWord'> {
  statement: IMarkWordItemStatement[];
  position: number;
  words: IMarkWordItemWord[];
}

export interface IMarkWordTaskSession extends ITaskSession<IMarkWordTaskItemSession> {}

export interface IMarkWordTaskItemSession extends IBaseTaskItemSession {
  answers: Array<string>;
}

export type tMarkWordAnswer = tTaskSessionAnswer<IMarkWordTaskItemSession>;

export type tStatefulStatementItem = IMarkWordItemStatement & { index: number };
