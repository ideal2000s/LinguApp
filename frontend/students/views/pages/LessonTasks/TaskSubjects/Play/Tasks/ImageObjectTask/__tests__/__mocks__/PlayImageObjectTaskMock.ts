import { IPlayImageObjectTask } from 'students/models/lessonTasks';

export const mockTask: IPlayImageObjectTask = {
  id: 1725,
  lessonId: 141,
  type: 'Tasks::ImageObject',
  subject: 'engage',
  audioURL: null,
  coverImg: false,
  giphyImage: null,
  imageURL: '/uploads/task/1725/image/38675608dba6731826e75e51eb4d788e.png',
  mobileImageURL:
    '/uploads/task/1725/image/cover_mobile-6aeab6264fbbdc8ae45a2cba49c7af93.jpg',
  title: 'Phasellus convallis mattis est et suscipit.',
  introduction:
    '<div class="trix-content">\n  <div class="trix-content">\n  <div class="trix-content">\n  <div class="trix-content">\n  <div class="trix-content">\n  <div class="trix-content">\n  \n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n',
  image: { width: 671, height: 473 },
  items: [
    {
      id: 2589,
      type: 'TaskItems::ImageObject',
      top: 58.734644763860366,
      left: 34.70395,
      width: 9.114583333333332,
      height: 10.677618069815194,
      audioURL: null,
      instruction: 'Select table on the picture'
    },
    {
      id: 2590,
      type: 'TaskItems::ImageObject',
      top: 41.792177618069815,
      left: 43.02475,
      width: 8.76736111111111,
      height: 14.784394250513348,
      audioURL: '/uploads/taskitem/2590/audio/9005acee4890ae5f1f4c67c76adccb45.mp3',
      instruction: 'Select TV on the picture'
    },
    {
      id: 2591,
      type: 'TaskItems::ImageObject',
      top: 67.20156570841888,
      left: 25.31030555555556,
      width: 9.54861111111111,
      height: 13.552361396303903,
      audioURL: '/uploads/taskitem/2591/audio/8d2319d0f115591e4c5b5c03ab3623e8.mp3',
      instruction: 'Select sofa on the picture'
    }
  ],
  url: '/api/lessons/141/tasks/1725'
};

export const mockHeading = 'Pick the right object from the next picture';
