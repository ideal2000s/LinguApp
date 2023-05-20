import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

export interface IInlineDropdownTask
  extends ILessonTaskBase<'Tasks::InlineDropdown', IInlineDropdownItem> {
  instruction?: string | null;
  videoURL: string | null;
}
export interface IInlineDropdownItem
  extends ILessonTaskItemBase<'TaskItems::InlineDropdown'> {
  statement: string;
  answers: string[][];
  solution: string[];
}

//ANSWER TYPES

export interface IInlineDropdownTaskSession
  extends ITaskSession<IInlineDropdownTaskItemSession> {}
export interface IInlineDropdownTaskItemSession extends IBaseTaskItemSession {
  answers: Array<string>;
}

export type tInlineDropdownAnswer = tTaskSessionAnswer<IInlineDropdownTaskItemSession>;
