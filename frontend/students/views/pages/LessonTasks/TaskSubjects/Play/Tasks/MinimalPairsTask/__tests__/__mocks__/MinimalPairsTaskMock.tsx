import { IMinimalPairsTask } from 'students/models/lessonTasks';

export const mockTask: IMinimalPairsTask = {
  id: 5,
  lessonId: 4,
  type: 'Tasks::SelectVideo',
  subject: 'engage',
  audioURL: null,
  coverImg: false,
  imageURL: null,
  giphyImage: null,
  instruction: 'Test instruction',
  mobileImageURL: null,
  title: 'Minimal pairs',
  introduction: 'Introduction',
  items: [
    {
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
    },
    {
      id: 17,
      type: 'TaskItems::SelectVideo',
      position: 2,
      question: 'Why?',
      videoURL: 'https://youtu.be/Ay6K0_4ZZ_0',
      options: [
        {
          id: 1,
          answer: 'A',
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
        }
      ]
    }
  ],
  url: '/api/lessons/4/tasks/5'
};
