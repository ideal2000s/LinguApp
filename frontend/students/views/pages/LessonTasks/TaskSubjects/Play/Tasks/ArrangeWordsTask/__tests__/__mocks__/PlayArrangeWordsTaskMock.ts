import { IPlayArrangeWordsTask } from 'students/models/lessonTasks';

export const mockTask: IPlayArrangeWordsTask = {
  id: 1722,
  lessonId: 141,
  type: 'Tasks::ArrangeWords',
  subject: 'engage',
  audioURL: null,
  coverImg: false,
  imageURL: null,
  mobileImageURL: null,
  title: 'Mauris sit amet ornare leo.',
  giphyImage: null,
  instruction: null,
  introduction:
    '<div class="trix-content">\n  <div class="trix-content">\n  <div class="trix-content">\n  <div class="trix-content">\n  \n</div>\n</div>\n</div>\n</div>\n',
  items: [
    {
      id: 2578,
      type: 'TaskItems::ArrangeWords',
      words: ['three', 'logo', 'one', 'two', 'four', 'email', 'five', 'name'],
      description: 'eins zwei drei vier fünf',
      audioURL: '/uploads/taskitem/2578/audio/72de38fc6c71dafa9dbe00be2fa3765d.mp3',
      position: 1,
      solution: 'one two three four five'
    },
    {
      id: 2579,
      type: 'TaskItems::ArrangeWords',
      words: ['nine', 'name', 'six', 'eight', 'email', 'seven', 'logo', 'ten'],
      description: 'sechs sieben acht neun zehn',
      audioURL: '/uploads/taskitem/2579/audio/5462416961ca3cb967eb02ce8f2abe74.mp3',
      position: 2,
      solution: 'six seven eight nine ten'
    }
  ],
  url: '/api/lessons/141/tasks/1722'
};
