import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

export interface IDictationTask
  extends ILessonTaskBase<'Tasks::Dictation', IDictationItem> {
  instruction: string | null;
  characters: string[];
}

export interface IDictationItem extends ILessonTaskItemBase<'TaskItems::Dictation'> {
  sentence: string;
  audioURL: string;
  description: string;
  cleanSentence: string;
}

export interface IDictationTaskSession extends ITaskSession<IDictationTaskItemSession> {}

export interface IDictationTaskItemSession extends IBaseTaskItemSession {}

export type tDictationAnswer = tTaskSessionAnswer<IDictationTaskItemSession>;
