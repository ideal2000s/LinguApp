import {
  IMultipleChoiceItem,
  IMultipleChoiceTaskItemSession
} from 'students/models/lessonTasks';

type tMockChoice = {
  itemId: IMultipleChoiceItem['id'];
  singleChoice: IMultipleChoiceItem['singleChoice'];
  options: IMultipleChoiceItem['options'];
  answers: IMultipleChoiceTaskItemSession;
};

export const mockSingleChoice: tMockChoice = {
  itemId: 2577,
  singleChoice: true,
  options: [
    { id: 745, answer: 'Phasellus ut rhoncus elit.', correct: false },
    { id: 746, answer: 'Nulla et odio sit amet urna ultrices semper.', correct: true },
    { id: 747, answer: 'Sed ac vehicula quam. ', correct: false }
  ],
  answers: {
    id: 295,
    taskItemId: 2577,
    completed: false,
    options: [
      { answer: null, taskItemOptionId: 745 },
      { answer: null, taskItemOptionId: 746 },
      { answer: null, taskItemOptionId: 747 }
    ],
    attemptsCount: 0
  }
};

export const mockMultiChoice: tMockChoice = {
  itemId: 2576,
  singleChoice: false,
  options: [
    { id: 742, answer: 'Donec fringilla maximus ipsum in rutrum.', correct: true },
    { id: 743, answer: 'Proin dictum gravida congue.', correct: false },
    { id: 744, answer: 'Maecenas consequat mauris quis dapibus mattis.', correct: true }
  ],

  answers: {
    id: 294,
    taskItemId: 2576,
    completed: false,
    options: [
      { answer: null, taskItemOptionId: 742 },
      { answer: null, taskItemOptionId: 743 },
      { answer: null, taskItemOptionId: 744 }
    ],
    attemptsCount: 0
  }
};
