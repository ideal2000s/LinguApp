import { IPlayImageHotspotTask } from 'students/models/lessonTasks';

export const mockTask: IPlayImageHotspotTask = {
  audioURL: null,
  coverImg: false,
  id: 1727,
  image: { width: 1389, height: 726 },
  imageURL: 'image',
  mobileImageURL: null,
  title: 'Image hotspot',
  introduction: '',
  lessonId: 141,
  type: 'Tasks::ImageHotspot',
  subject: 'engage',
  giphyImage: null,
  items: [
    {
      id: 2578,
      top: 30,
      left: 60,
      type: 'TaskItems::ImageHotspot',
      word: {
        body: 'correct',
        wordClass: 'test'
      },
      incorrectWords: [
        {
          body: 'one',
          wordClass: 'test'
        },
        {
          body: 'two',
          wordClass: 'test'
        },
        {
          body: 'three',
          wordClass: 'test'
        },
        {
          body: 'four',
          wordClass: 'test'
        },
        {
          body: 'five',
          wordClass: 'test'
        }
      ],
      position: 1
    },
    {
      id: 25,
      top: 2578,
      left: 60,
      type: 'TaskItems::ImageHotspot',
      word: {
        body: 'correct2',
        wordClass: 'test'
      },
      incorrectWords: [
        {
          body: 'one',
          wordClass: 'test'
        },
        {
          body: 'two',
          wordClass: 'test'
        },
        {
          body: 'three',
          wordClass: 'test'
        },
        {
          body: 'four',
          wordClass: 'test'
        },
        {
          body: 'five',
          wordClass: 'test'
        }
      ],
      position: 2
    }
  ],
  url: '/api/lessons/141/tasks/1722'
};
