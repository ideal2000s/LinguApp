import { IFillInTableResultItem } from 'students/models/lessonTasks/results';

export const mockFillInTableAnswer: IFillInTableResultItem = {
  id: 8084,
  type: 'TaskItems::FillInTable',
  question: 'first question',
  audioURL: '/uploads/taskitem/8146/audio/audio.mp3',
  position: 1,
  options: [
    {
      id: 3009,
      answers: ['ans', 'ans1']
    }
  ],
  itemSession: {
    answer: ['ans1', 'answee']
  }
};
