import { IMarkWordAudioTask } from 'students/models/lessonTasks';

export const mockTask: IMarkWordAudioTask = {
  id: 5,
  lessonId: 4,
  type: 'Tasks::MarkWordAudio',
  subject: 'engage',
  audioURL: null,
  coverImg: false,
  imageURL: null,
  giphyImage: null,
  mobileImageURL: null,
  title: 'Tap the words game',
  instruction: null,
  introduction: 'Introduction',
  items: [
    {
      id: 16,
      type: 'TaskItems::MarkWordAudio',
      position: 1,
      statement: [
        { word: 'Bilberries', disabled: false, solution: false },
        {
          word: ', ',
          disabled: true,
          solution: false
        },
        { word: 'also', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'shelf', disabled: false, solution: true },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'black', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'berries', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'found', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'n', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'nutrient-poor', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'soils', disabled: false, solution: false }
      ],
      audioURL: null
    },
    {
      id: 17,
      type: 'TaskItems::MarkWordAudio',
      position: 2,
      statement: [
        { word: 'Bilberries', disabled: false, solution: false },
        {
          word: ', ',
          disabled: true,
          solution: false
        },
        { word: 'also', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'car', disabled: false, solution: true },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'black', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'berries', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'found', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'in', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'nutrient-poor', disabled: false, solution: false },
        {
          word: ' ',
          disabled: true,
          solution: false
        },
        { word: 'soils', disabled: false, solution: false }
      ],
      audioURL: null
    },
    {
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
    }
  ],
  url: '/api/lessons/4/tasks/5'
};
