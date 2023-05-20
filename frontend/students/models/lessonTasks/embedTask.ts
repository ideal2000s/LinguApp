import { IBaseTaskItemSession, ILessonTaskBase, ILessonTaskItemBase } from './base';

export interface ILearnEmbedTask
  extends ILessonTaskBase<'Tasks::Embed', ILearnEmbedItem> {}
export interface ILearnEmbedItem extends ILessonTaskItemBase<'TaskItems::Embed'> {
  url: string;
}

// ANSWER TYPES
export interface ILearnEmbedTaskItemSession extends IBaseTaskItemSession {}
