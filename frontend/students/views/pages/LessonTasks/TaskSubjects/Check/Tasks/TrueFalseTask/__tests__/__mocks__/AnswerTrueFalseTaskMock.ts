import { ITrueFalseResultsItem } from 'students/models/lessonTasks/results';

export const mockTrueFalseTask: ITrueFalseResultsItem = {
  id: 8081,
  type: 'TaskItems::TrueFalse',
  statement: 'truthy statement',
  position: 1,
  correct: true,
  itemSession: {
    answer: false
  }
};
