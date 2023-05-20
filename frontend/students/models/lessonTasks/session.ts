import { IArrangeWordsTaskItemSession } from './arrangeWordsTask';
import { IInlineDropdownTaskItemSession } from './inlineDropdownTask';
import { ILearnEmbedTaskItemSession } from './embedTask';
import { ILearnTextTaskItemSession } from './readListenTask';
import { ILearnVideoTaskItemSession } from './videoTask';
import { IMultipleChoiceTaskItemSession } from './selectTextTask';
import { ITrueFalseTaskItemSession } from './trueFalseTask';
import { IFillInTableTaskItemSession } from './fillInTableTask';
import { IMinimalPairsTaskItemSession } from './minimalPairsTask';
import { ILessonSession } from '../lesson';

type tTaskItemSession =
  | IMultipleChoiceTaskItemSession
  | IArrangeWordsTaskItemSession
  | IInlineDropdownTaskItemSession
  | ITrueFalseTaskItemSession
  | ILearnTextTaskItemSession
  | ILearnVideoTaskItemSession
  | ILearnEmbedTaskItemSession
  | IFillInTableTaskItemSession
  | IMinimalPairsTaskItemSession;

export interface ITaskSession<T extends tTaskItemSession = tTaskItemSession> {
  id: number;
  lessonSession: ILessonSession;
  taskId: number;
  status: 'active' | 'completed';
  subject: 'teach' | 'engage' | 'test';
  taskItemSessions: Array<T>;
  url: string;
}

// response for
// get /api/lesson_sessions/${sessionId}/task_session
// get /api/lessons/${lessonId}/tasks/${taskId}/session
export interface ITaskSessionApiResponse<T extends tTaskItemSession = tTaskItemSession> {
  taskSession: ITaskSession<T>;
}

// request and response for
// post /api/lesson_sessions/${lessonSessionId}/task_sessions/${taskSessionId}/answer
export interface ITaskSessionAnswerRequest<
  T extends tTaskItemSession = tTaskItemSession
> {
  answer: tTaskSessionAnswer<T>;
}
export type tTaskSessionAnswer<T extends tTaskItemSession = tTaskItemSession> = Array<T>;

export interface ITaskSessionAnswerResponse extends ITaskSessionApiResponse {}
