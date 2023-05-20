import { ICheckTrueFalseTask } from 'students/models/lessonTasks';

export const mockTask: ICheckTrueFalseTask = {
  id: 1718,
  lessonId: 141,
  type: 'Tasks::TrueFalse',
  subject: 'test',
  audioURL: null,
  imageURL: null,
  videoURL: null,
  giphyImage: null,
  mobileImageURL: null,
  coverImg: false,
  title: 'Ut blandit quam ac felis fermentum efficitur.',
  introduction: '',
  items: [
    {
      id: 2569,
      type: 'TaskItems::TrueFalse',
      statement: 'Etiam bibendum ultricies vulputate?',
      position: 0,
      correct: true
    },
    {
      id: 2568,
      type: 'TaskItems::TrueFalse',
      statement: 'Donec sodales erat a massa fermentum tristique?',
      position: 0,
      correct: false
    },
    {
      id: 2567,
      type: 'TaskItems::TrueFalse',
      statement: 'Cras suscipit nisl vitae sem sodales aliquet?',
      position: 0,
      correct: false
    },
    {
      id: 2566,
      type: 'TaskItems::TrueFalse',
      statement: 'Suspendisse id sem lectus?',
      position: 0,
      correct: true
    }
  ],
  url: '/api/lessons/141/tasks/1718'
};
