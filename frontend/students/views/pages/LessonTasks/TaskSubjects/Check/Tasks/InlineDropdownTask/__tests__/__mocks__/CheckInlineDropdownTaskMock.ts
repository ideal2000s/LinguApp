import { IInlineDropdownTask } from 'students/models/lessonTasks';

export const mockTask: IInlineDropdownTask = {
  id: 1719,
  lessonId: 141,
  type: 'Tasks::InlineDropdown',
  subject: 'test',
  audioURL: null,
  videoURL: null,
  imageURL: null,
  giphyImage: null,
  mobileImageURL: null,
  coverImg: false,
  title: 'Quisque id ullamcorper nibh. ',
  introduction: '',
  items: [
    {
      id: 2572,
      type: 'TaskItems::InlineDropdown',
      answers: [
        ['placerat', 'mollis', 'lobortis'],
        ['commodo', 'eleifend', 'platea'],
        ['urna', 'faucibus']
      ],
      audioURL: null,
      position: 0,
      statement:
        'Vivamus ac ornare felis. Sed ** dictum pharetra. Proin vitae egestas tortor, eget consequat augue. Phasellus ** vel malesuada neque. Aliquam erat volutpat. In gravida lectus lobortis, ** scelerisque sem viverra, scelerisque augue.',
      solution: ['mollis', 'eleifend', 'urna']
    },
    {
      id: 2571,
      type: 'TaskItems::InlineDropdown',
      answers: [
        ['rutrum', 'erat', 'pretium'],
        ['fermentum', 'malesuada', 'egestas']
      ],
      audioURL: null,
      position: 0,
      statement:
        'Donec porta, diam eu egestas commodo, ipsum metus ** placerat dui, at egestas nibh arcu vel dolor. Cras vitae neque eget eros semper suscipit nec ut diam. Maecenas ** sodales magna venenatis fermentum.',
      solution: ['pretium', 'egestas']
    },
    {
      id: 2570,
      type: 'TaskItems::InlineDropdown',
      answers: [['maximus', 'sodales', 'ornare', 'ipsum']],
      audioURL: null,
      position: 0,
      statement:
        'Integer at pulvinar magna. Nam aliquam metus mi, in pellentesque elit tempor in. Vestibulum ** rutrum tincidunt.',
      solution: ['maximus']
    }
  ],
  url: '/api/lessons/141/tasks/1719'
};
