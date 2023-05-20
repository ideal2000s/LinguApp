import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

export interface IPlayImageObjectTask
  extends ILessonTaskBase<'Tasks::ImageObject', IPlayImageObjectItem> {
  image: { width: number; height: number };
  instruction?: string | null;
}
export interface IPlayImageObjectItem
  extends ILessonTaskItemBase<'TaskItems::ImageObject'> {
  top: number;
  left: number;
  width: number;
  height: number;
  instruction: string;
}

export interface IImageObjectTaskSession
  extends ITaskSession<IImageObjectTaskItemSession> {}
export interface IImageObjectTaskItemSession extends IBaseTaskItemSession {}

export type tImageObjectAnswer = tTaskSessionAnswer<IImageObjectTaskItemSession>;
