import { IBaseTaskItemSession, ILessonTaskBase, ILessonTaskItemBase } from './base';

export interface ILearnTextTask extends ILessonTaskBase<'Tasks::Text', ILearnTextItem> {}
export interface ILearnTextItem extends ILessonTaskItemBase<'TaskItems::Text'> {
  content: string;
}

// ANSWER TYPES
export interface ILearnTextTaskItemSession extends IBaseTaskItemSession {}
