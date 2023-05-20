import { IFillInTableTask } from 'students/models/lessonTasks';

export const mockTask: IFillInTableTask = {
  audioQuestionFormat: false,
  audioURL: null,
  videoURL: null,
  column1Demo: 'Yes',
  column2Demo: 'NO',
  columns: 2,
  coverImg: false,
  h1: null,
  h2: null,
  h3: null,
  hasDemo: true,
  id: 45,
  image: { width: 1492, height: 995 },
  imageURL: '/uploads/task/45/image/cover-d2552fa88f16d7127e82ee3992693125.jpg',
  introduction: '',
  items: [
    {
      audioURL: null,
      id: 89,
      options: [
        { id: 24, answers: ['sdfs asd f'] },
        { id: 25, answers: ['affsa se fsae '] }
      ],
      position: 1,
      question: 'The man took top floor.',
      type: 'TaskItems::FillInTable'
    },
    {
      audioURL: null,
      id: 90,
      options: [
        { id: 26, answers: ['sdfs asd f'] },
        { id: 27, answers: ['affsa se fsae '] }
      ],
      position: 2,
      question: 'asdfasdfsaf',
      type: 'TaskItems::FillInTable'
    }
  ],
  lessonId: 11,
  mobileImageURL:
    '/uploads/task/45/image/cover_mobile-783705ad376db4829ef5684ca7db4de1.jpg',
  questionDemo: 'This is a demo question?',
  questionFormat: 'text',
  subject: 'test',
  title: 'sdfasdfasdf',
  type: 'Tasks::FillInTable',
  giphyImage: null,
  url: '/api/lessons/11/tasks/45'
};
