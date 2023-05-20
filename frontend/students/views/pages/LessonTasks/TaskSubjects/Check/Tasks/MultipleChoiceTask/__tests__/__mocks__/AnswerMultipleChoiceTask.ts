import { IMultipleChoiceResultsItem } from 'students/models/lessonTasks/results';

export const mockMultipleChoiceItem: IMultipleChoiceResultsItem = {
  id: 8077,
  type: 'TaskItems::SelectText',
  question: 'second question (multiple)',
  position: 2,
  options: [
    {
      id: 3003,
      answer: 'correct answer 1',
      correct: true
    },
    {
      id: 3004,
      answer: 'correct answer 2',
      correct: true
    },
    {
      id: 3005,
      answer: 'incorrect answer',
      correct: false
    }
  ],
  itemSession: {
    options: [
      {
        answer: null,
        taskItemOptionId: 3003
      },
      {
        answer: true,
        taskItemOptionId: 3004
      },
      {
        answer: true,
        taskItemOptionId: 3005
      }
    ]
  }
};
