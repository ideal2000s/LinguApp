import { IFillSentenceGapItem } from 'students/models/lessonTasks';

export const mockItem: IFillSentenceGapItem = {
  answers: [['kek', 'country', 'dialect', 'district']],
  audioURL: null,
  id: 8,
  position: 1,
  solution: ['kek'],
  statement: 'English is a beautiful and complete ** ever.',
  type: 'TaskItems::FillGap'
};
