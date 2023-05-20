// response for
// post /api/lessons/${lessonId}/session
// get /api/lesson_session/${lessonSessionId}
export interface ILessonSessionApiResponse {
  lessonSession: ILessonSession;
}

export type tSectionType = 'teach' | 'engage' | 'test';

export interface ITaskSectionProgress<T extends tSectionType = tSectionType> {
  title: T;
  progress: number;
  tasks: ITaskSection[];
}

export interface ILessonSession {
  id: number;
  lessonId: number;
  progressSummary: IProgressSummary;
  status: 'active' | 'completed';
  summary: ISections;
  taskId: number;
}

export interface IProgressSummary {
  completed: number;
  percents: number;
  total: number;
}
export interface ILessonSessionResponse {
  lessonSession: ILessonSession;
}

export interface ISections {
  teach?: ITaskSectionProgress<'teach'>;
  engage?: ITaskSectionProgress<'engage'>;
  test?: ITaskSectionProgress<'test'>;
}

interface ITaskSection {
  id: number;
  title: string;
  progress: number;
}
