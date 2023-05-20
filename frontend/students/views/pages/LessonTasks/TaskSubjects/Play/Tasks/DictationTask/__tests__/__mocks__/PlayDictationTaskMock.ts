import { IDictationTask } from 'students/models/lessonTasks';

export const mockTask: IDictationTask = {
  id: 1722,
  lessonId: 141,
  type: 'Tasks::Dictation',
  subject: 'engage',
  audioURL: null,
  coverImg: false,
  imageURL: null,
  mobileImageURL: null,
  title: 'Good title',
  giphyImage: null,
  instruction: null,
  characters: ['a', 'b', 'c'],
  introduction:
    '<div class="trix-content">\n  <div class="trix-content">\n  <div class="trix-content">\n  <div class="trix-content">\n  \n</div>\n</div>\n</div>\n</div>\n',
  items: [
    {
      audioURL: '/uploads/taskitem/103/audio/90d13b2c2f00b187320985d32eb88cbe.mp3',
      id: 103,
      sentence: 'Deåte er',
      cleanSentence: 'deåte er',
      description: 'Description',
      type: 'TaskItems::Dictation'
    },
    {
      audioURL: '/uploads/taskitem/103/audio/90d13b2c2f00b187320985d32eb88cbe.mp3',
      id: 105,
      sentence: 'Some pretty sentence',
      cleanSentence: 'some pretty sentence',
      description: 'Description',
      type: 'TaskItems::Dictation'
    }
  ],
  url: '/api/lessons/141/tasks/1722'
};
