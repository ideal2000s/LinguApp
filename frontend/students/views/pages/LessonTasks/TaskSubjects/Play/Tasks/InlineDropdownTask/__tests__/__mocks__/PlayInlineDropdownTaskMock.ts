import { IInlineDropdownTask } from 'students/models/lessonTasks';

export const mockTask: IInlineDropdownTask = {
  id: 1723,
  lessonId: 141,
  type: 'Tasks::InlineDropdown',
  subject: 'engage',
  audioURL: null,
  coverImg: false,
  imageURL: null,
  videoURL: null,
  mobileImageURL: null,
  title: 'Duis feugiat nisi a porta eleifend.',
  giphyImage: null,
  instruction: null,
  introduction:
    '<div class="trix-content">\n  <div class="trix-content">\n  <div class="trix-content">\n  <div class="trix-content">\n  \n</div>\n</div>\n</div>\n</div>\n',
  items: [
    {
      id: 2583,
      type: 'TaskItems::InlineDropdown',
      answers: [
        ['laoreet', 'dignissim', 'venenatis', 'massa'],
        ['rhoncus', 'neque', 'pellentesque'],
        ['varius', 'tempor']
      ],
      audioURL: null,
      position: 1,
      statement:
        'Suspendisse commodo ** consectetur accumsan. Pellentesque habitant morbi ** tristique senectus et netus et malesuada fames ac turpis egestas. Fusce iaculis ** tincidunt gravida.',
      solution: ['dignissim', 'pellentesque', 'tempor']
    },
    {
      id: 2584,
      type: 'TaskItems::InlineDropdown',
      answers: [
        ['bibendum', 'fermentum', 'euismod', 'lectus'],
        ['enim', 'ullamcorper', 'metus']
      ],
      audioURL: null,
      position: 2,
      statement:
        'Suspendisse vel ** justo eget justo rhoncus aliquam. Nullam feugiat ** eget nisi vehicula hendrerit.',
      solution: ['lectus', 'ullamcorper']
    },
    {
      id: 2585,
      type: 'TaskItems::InlineDropdown',
      answers: [['sapien', 'egestas', 'tincidunt', 'mauris']],
      audioURL: null,
      position: 3,
      statement: 'Donec bibendum at ** eros condimentum pellentesque.',
      solution: ['tincidunt']
    }
  ],
  url: '/api/lessons/141/tasks/1723'
};
