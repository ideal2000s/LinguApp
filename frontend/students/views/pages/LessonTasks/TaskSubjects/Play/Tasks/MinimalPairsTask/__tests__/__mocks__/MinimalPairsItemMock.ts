import { IMinimalPairsTaskItem } from 'students/models/lessonTasks';

export const mockItem: IMinimalPairsTaskItem = {
  id: 16,
  type: 'TaskItems::SelectVideo',
  position: 1,
  question: 'Why?',
  videoURL: 'https://youtu.be/H9154xIoYTA',
  options: [
    {
      id: 1,
      answer: 'Very loooong text',
      correct: true
    },
    {
      id: 2,
      answer: 'B',
      correct: false
    },
    {
      id: 3,
      answer: 'C',
      correct: false
    },
    {
      id: 4,
      answer: 'D',
      correct: false
    },
    {
      id: 5,
      answer: 'E',
      correct: false
    },
    {
      id: 6,
      answer: 'F',
      correct: false
    },
    {
      id: 7,
      answer: 'J',
      correct: false
    }
  ]
};
