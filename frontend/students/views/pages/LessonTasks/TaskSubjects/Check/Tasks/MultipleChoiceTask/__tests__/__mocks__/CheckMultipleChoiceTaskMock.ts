import { IMultipleChoiceTask } from 'students/models/lessonTasks';

export const mockTask: IMultipleChoiceTask = {
  id: 1721,
  lessonId: 141,
  type: 'Tasks::SelectText',
  subject: 'test',
  audioURL: null,
  imageURL: null,
  videoURL: null,
  giphyImage: null,
  mobileImageURL: null,
  coverImg: false,
  title: 'Aliquam sodales tincidunt pulvinar.',
  introduction: '',
  items: [
    {
      id: 2576,
      type: 'TaskItems::SelectText',
      question: 'Ut lectus mauris, imperdiet vitae tristique id, semper id nisl?',
      singleChoice: false,
      position: 1,
      options: [
        { id: 742, answer: 'Donec fringilla maximus ipsum in rutrum.', correct: true },
        { id: 743, answer: 'Proin dictum gravida congue.', correct: false },
        {
          id: 744,
          answer: 'Maecenas consequat mauris quis dapibus mattis.',
          correct: true
        }
      ]
    },
    {
      id: 2577,
      type: 'TaskItems::SelectText',
      question: 'Aliquam efficitur ipsum justo?',
      singleChoice: true,
      position: 2,
      options: [
        { id: 745, answer: 'Phasellus ut rhoncus elit.', correct: false },
        {
          id: 746,
          answer: 'Nulla et odio sit amet urna ultrices semper.',
          correct: true
        },
        { id: 747, answer: 'Sed ac vehicula quam. ', correct: false }
      ]
    }
  ],
  url: '/api/lessons/141/tasks/1721'
};
