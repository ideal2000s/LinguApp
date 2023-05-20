import { IPlayImageHotspotItem } from 'students/models/lessonTasks';

export const mockItem: IPlayImageHotspotItem = {
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
};
