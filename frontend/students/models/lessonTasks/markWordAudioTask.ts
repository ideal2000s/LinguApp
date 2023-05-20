import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

export interface IMarkWordAudioTask
  extends ILessonTaskBase<'Tasks::MarkWordAudio', IMarkWordAudioItem> {
  instruction: string | null;
}

export interface IMarkWordAudioItemStatement {
  word: string;
  disabled: boolean;
  solution: boolean;
}

export interface IMarkWordAudioItem
  extends ILessonTaskItemBase<'TaskItems::MarkWordAudio'> {
  statement: IMarkWordAudioItemStatement[];
  position: number;
  audioURL: string | null;
}

export interface IMarkWordAudioTaskSession
  extends ITaskSession<IMarkWordAudioTaskItemSession> {}

export interface IMarkWordAudioTaskItemSession extends IBaseTaskItemSession {
  answers: Array<string>;
}

export type tMarkWordAudioAnswer = tTaskSessionAnswer<IMarkWordAudioTaskItemSession>;

export type tStatefulStatement = IMarkWordAudioItemStatement & {
  selected: boolean;
  index: number;
};
