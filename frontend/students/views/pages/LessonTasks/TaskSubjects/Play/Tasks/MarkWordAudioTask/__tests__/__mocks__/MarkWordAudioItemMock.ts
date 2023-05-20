import { IMarkWordAudioItem } from 'students/models/lessonTasks';

export const mockItem: IMarkWordAudioItem = {
  id: 19,
  type: 'TaskItems::MarkWordAudio',
  position: 4,
  statement: [
    { word: 'Once', disabled: false, solution: false },
    {
      word: ' ',
      disabled: true,
      solution: false
    },
    { word: 'again', disabled: false, solution: false },
    {
      word: ' ',
      disabled: true,
      solution: false
    },
    { word: 'this', disabled: false, solution: true },
    {
      word: ' ',
      disabled: true,
      solution: false
    },
    { word: 'is', disabled: false, solution: false },
    {
      word: ' ',
      disabled: true,
      solution: false
    },
    { word: 'not', disabled: false, solution: false },
    {
      word: ' ',
      disabled: true,
      solution: false
    },
    { word: 'so', disabled: false, solution: false },
    {
      word: ' ',
      disabled: true,
      solution: false
    },
    { word: 'funny', disabled: false, solution: false },
    { word: '.', disabled: true, solution: false }
  ],
  audioURL: null
};
