import { IPlayAuditionTask } from 'students/models/lessonTasks';

export const mockTask: IPlayAuditionTask = {
  id: 1710,
  lessonId: 97,
  type: 'Tasks::Audition',
  subject: 'engage',
  audioURL: '/uploads/task/1710/audio/e3b6335a2061e9062a0692e1ee9ef326.mp3',
  coverImg: false,
  imageURL: null,
  mobileImageURL: null,
  title: 'Sample audition task',
  giphyImage: null,
  instruction: 'Hear and select you are thinking correct',
  introduction: '',
  items: [
    {
      id: 2549,
      type: 'TaskItems::Audition',
      words: [
        { body: 'soothingly', wordClass: 'adverb', image: null },
        { body: 'shipping', wordClass: 'noun', image: null },
        { body: 'scarlet', wordClass: 'adjective', image: null },
        { body: 'sannsynliggjøre', wordClass: 'verb', image: null },
        { body: 'spread', wordClass: 'noun', image: null }
      ],
      start: 5,
      startString: '00:00:05',
      correctWord: { body: 'school', wordClass: 'noun', image: null }
    },
    {
      id: 2550,
      type: 'TaskItems::Audition',
      words: [
        { body: 'stomach', wordClass: 'noun', image: null },
        { body: 'stråle', wordClass: 'adjective', image: null },
        { body: 'sprain', wordClass: 'noun', image: null },
        { body: 'stormy', wordClass: 'adjective', image: null },
        { body: 'spike', wordClass: 'verb', image: null }
      ],
      start: 10,
      startString: '00:00:10',
      correctWord: { body: 'study', wordClass: 'verb', image: null }
    }
  ],
  url: '/api/lessons/97/tasks/1710'
};
