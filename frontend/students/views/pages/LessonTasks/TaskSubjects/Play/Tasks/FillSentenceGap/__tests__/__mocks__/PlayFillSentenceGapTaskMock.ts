import { IFillSentenceGapTask } from 'students/models/lessonTasks';

export const mockTask: IFillSentenceGapTask = {
  audioURL: null,
  coverImg: false,
  id: 2,
  imageURL: null,
  introduction: '',
  giphyImage: null,
  instruction: null,
  items: [
    {
      answers: [['kek', 'country', 'dialect', 'district']],
      audioURL: '/uploads/taskitem/8/audio/8fb47f64c4b56c2ec17c16765d6e253a.mp3',
      id: 8,
      position: 1,
      solution: ['kek'],
      statement: 'English is a beautiful and complete ** ever.',
      type: 'TaskItems::FillGap'
    },
    {
      answers: [['language', 'district', 'country', 'dialect']],
      audioURL: null,
      id: 5,
      position: 2,
      solution: ['language'],
      statement: 'English is a **',
      type: 'TaskItems::FillGap'
    }
  ],
  lessonId: 4,
  mobileImageURL: null,
  subject: 'engage',
  title: 'Some title',
  type: 'Tasks::FillGap',
  url: '/api/lessons/4/tasks/2'
};
