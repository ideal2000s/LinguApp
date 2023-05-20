import { ILessonTaskBase, ILessonTaskItemBase, IBaseTaskItemSession } from './base';
import { ITaskSession, tTaskSessionAnswer } from './session';

export interface ICheckTrueFalseTask
  extends ILessonTaskBase<'Tasks::TrueFalse', ICheckTrueFalseItem> {
  videoURL: string | null;
}
export interface ICheckTrueFalseItem extends ILessonTaskItemBase<'TaskItems::TrueFalse'> {
  statement: string;
  correct: boolean;
}

//ANSWER TYPES
export interface ITrueFalseTaskItemSession extends IBaseTaskItemSession {
  answer: boolean | null;
}
export interface ITrueFalseTaskSession extends ITaskSession<ITrueFalseTaskItemSession> {}
export type tTrueFalseAnswer = tTaskSessionAnswer<ITrueFalseTaskItemSession>;
