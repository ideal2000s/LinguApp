import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { tTaskSessionAnswer, ITaskSession } from './session';

export interface IMultipleChoiceTask
  extends ILessonTaskBase<'Tasks::SelectText', IMultipleChoiceItem> {
  videoURL: string | null;
}
export interface IMultipleChoiceItem
  extends ILessonTaskItemBase<'TaskItems::SelectText'> {
  question: string;
  singleChoice: boolean | null;
  options: IMultipleChoiceItemOption[];
}
export interface IMultipleChoiceItemOption {
  id: number;
  answer: string;
  correct: boolean;
}

//ANSWER TYPES
export interface IMultipleChoiceTaskSession
  extends ITaskSession<IMultipleChoiceTaskItemSession> {}
export interface IMultipleChoiceTaskItemSession extends IBaseTaskItemSession {
  options: Array<{
    taskItemOptionId: number;
    answer: boolean | null;
  }>;
}

export type tMultipleChoiceAnswer = tTaskSessionAnswer<IMultipleChoiceTaskItemSession>;
