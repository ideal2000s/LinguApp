import { ILessonSession } from 'students/models';

export const lessonSessionMock: ILessonSession = {
  id: 1,
  lessonId: 3,
  status: 'completed',
  progressSummary: {
    completed: 0,
    percents: 20,
    total: 1
  },
  summary: {
    test: {
      title: 'test',
      progress: 100,
      tasks: [{ id: 1, title: 'fill in table', progress: 100 }]
    }
  },
  taskId: 4
};

export default lessonSessionMock;
