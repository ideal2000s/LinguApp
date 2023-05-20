import { ICheckFillInBlanksTask } from 'students/models/lessonTasks';

export const mockTask: ICheckFillInBlanksTask = {
  id: 1720,
  lessonId: 141,
  type: 'Tasks::FillInBlanks',
  subject: 'test',
  audioURL: null,
  imageURL: null,
  videoURL: null,
  giphyImage: null,
  mobileImageURL: null,
  coverImg: false,
  title: 'Sed vel interdum augue. ',
  introduction: '',
  items: [
    {
      id: 2575,
      type: 'TaskItems::FillInBlanks',
      audioURL: null,
      position: 0,
      question:
        'Suspendisse egestas ** vitae odio eget iaculis. Class aptent taciti sociosqu ad ** litora torquent per conubia nostra, per inceptos himenaeos. Nunc pretium eros ** lacus, eget eleifend justo aliquet at.',
      solution: [
        ['luctus', 'nisl'],
        ['dignissim', 'risus', 'lorem'],
        ['scelerisque', 'suscipit']
      ]
    },
    {
      id: 2574,
      type: 'TaskItems::FillInBlanks',
      audioURL: null,
      position: 0,
      question:
        'Cras laoreet semper dui, ** quis molestie nunc dapibus quis. Aenean tincidunt ** et justo in pretium.',
      solution: [
        ['tincidunt', 'mattis', 'fringilla', 'eleifend'],
        ['tortor', 'viverra']
      ]
    },
    {
      id: 2573,
      type: 'TaskItems::FillInBlanks',
      audioURL: null,
      position: 0,
      question:
        'Pellentesque habitant morbi tristique ** senectus et netus et malesuada fames ac turpis egestas.',
      solution: [['congue', 'neque']]
    }
  ],
  url: '/api/lessons/141/tasks/1720'
};
