import { IBaseTaskItemSession, ILessonTaskBase, ILessonTaskItemBase } from './base';

export interface ILearnVideoTask
  extends ILessonTaskBase<'Tasks::Video', ILearnVideoItem> {}
export interface ILearnVideoItem extends ILessonTaskItemBase<'TaskItems::Video'> {
  caption: string;
  url: string;
}

// ANSWER TYPES
export interface ILearnVideoTaskItemSession extends IBaseTaskItemSession {}
