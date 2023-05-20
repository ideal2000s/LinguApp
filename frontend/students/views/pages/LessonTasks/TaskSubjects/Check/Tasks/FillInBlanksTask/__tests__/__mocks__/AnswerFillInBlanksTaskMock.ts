import { IFillInBlanksResultsItem } from 'students/models/lessonTasks/results';

export const mockSentenceGap: IFillInBlanksResultsItem = {
  id: 8078,
  type: 'TaskItems::FillInBlanks',
  position: 1,
  question: 'The man took the ** to the top floor.',
  solution: [['lift', 'elevator']],
  itemSession: {
    answer: ['lift']
  }
};
