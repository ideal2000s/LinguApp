import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

export interface IPlayImageHotspotTask
  extends ILessonTaskBase<'Tasks::ImageHotspot', IPlayImageHotspotItem> {
  image: { width: number; height: number };
}

export interface IImageHotspotItemWord {
  body: string;
  wordClass: string;
}

export interface IPlayImageHotspotItem
  extends ILessonTaskItemBase<'TaskItems::ImageHotspot'> {
  top: number;
  left: number;
  incorrectWords: IImageHotspotItemWord[];
  word: IImageHotspotItemWord;
}

export interface IImageHotspotTaskSession
  extends ITaskSession<IImageHotspotTaskItemSession> {}

export interface IImageHotspotTaskItemSession extends IBaseTaskItemSession {}

export type tImageHotspotAnswer = tTaskSessionAnswer<IImageHotspotTaskItemSession>;
