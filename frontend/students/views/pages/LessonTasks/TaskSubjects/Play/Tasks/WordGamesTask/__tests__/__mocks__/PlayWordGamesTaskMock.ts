import { IPhrase } from 'students/models';
import { IWordGamesTask } from 'students/models/lessonTasks';

export const mockTask: IWordGamesTask = {
  id: 1725,
  lessonId: 141,
  type: 'Tasks::WordGames',
  subject: 'engage',
  audioURL: null,
  coverImg: false,
  giphyImage: null,
  imageURL: null,
  mobileImageURL: null,
  title: 'Word games.',
  introduction: 'Hello',
  items: [
    { id: 8090, type: 'TaskItems::WordGames', gameType: 'flashcard', enabled: true },
    { id: 8091, type: 'TaskItems::WordGames', gameType: 'waterfall', enabled: true },
    { id: 8092, type: 'TaskItems::WordGames', gameType: 'match', enabled: false },
    { id: 8094, type: 'TaskItems::WordGames', gameType: 'nodes', enabled: false }
  ],
  url: '/api/lessons/141/tasks/1725'
};

export const lessonPhrasesMock: IPhrase[] = [
  {
    id: 25949,
    body: 'Network',
    frequency: 4,
    wordTranslation: 'Мережа',
    imageURL: null,
    audioURL: null,
    animationURL: null,
    colorRequired: false
  }
];
