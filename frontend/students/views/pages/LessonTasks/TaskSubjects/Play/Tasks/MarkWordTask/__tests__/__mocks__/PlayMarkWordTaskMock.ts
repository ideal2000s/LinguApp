import { IMarkWordTask } from 'students/models/lessonTasks';

export const mockTask: IMarkWordTask = {
  id: 5,
  lessonId: 4,
  type: 'Tasks::MarkWord',
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
      type: 'TaskItems::MarkWord',
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
      words: [
        {
          body: 'shelf',
          wordClass: 'verb',
          imageURL: '/uploads/083d2950b6a48b4b66b3778bf746de4e.svg',
          audioURL: null,
          wordTranslation: 'Shelf',
          animationURL: null,
          colorRequired: false
        }
      ]
    },
    {
      id: 17,
      type: 'TaskItems::MarkWord',
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
      words: [
        {
          body: 'car',
          wordClass: 'adjective',
          imageURL: '/uploads/0d8701c8aed9d51086a0e7d0d3fe8a52.svg',
          audioURL: null,
          wordTranslation: 'Car',
          animationURL: null,
          colorRequired: false
        }
      ]
    },
    {
      id: 19,
      type: 'TaskItems::MarkWord',
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
      words: [
        {
          body: 'laptop',
          wordClass: 'unknown',
          imageURL: null,
          audioURL: null,
          wordTranslation: 'Laptop',
          animationURL: null,
          colorRequired: false
        }
      ]
    }
  ],
  url: '/api/lessons/4/tasks/5'
};
