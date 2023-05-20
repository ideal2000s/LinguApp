import { ITaskResultsResponse } from 'students/models/lessonTasks/results';

const lessonFinishedAnswersListMock: ITaskResultsResponse = {
  taskItemsPublishedCount: 25,
  taskItemsCorrectlyAnsweredCount: 23,
  tasks: [
    {
      id: 4365,
      type: 'Tasks::FillInBlanks',
      title: 'fill in blanks task',
      items: [
        {
          id: 8080,
          type: 'TaskItems::FillInBlanks',
          position: 3,
          question: 'Hello, my ** is Fred',
          solution: [['name']],
          itemSession: { answer: ['name'] }
        },
        {
          id: 8079,
          type: 'TaskItems::FillInBlanks',
          position: 2,
          question: 'I ** this city',
          solution: [['love']],
          itemSession: { answer: ['love'] }
        },
        {
          id: 8078,
          type: 'TaskItems::FillInBlanks',
          position: 1,
          question: 'The man took the ** to the top floor.',
          solution: [['lift', 'elevator']],
          itemSession: { answer: ['lift'] }
        }
      ]
    },
    {
      id: 4371,
      type: 'Tasks::InlineDropdown',
      title: 'inline dropdown',
      items: [
        {
          id: 8095,
          type: 'TaskItems::InlineDropdown',
          answers: [['district', 'dialect', 'country', 'language']],
          position: 1,
          statement: 'English is a **.',
          solution: ['language'],
          itemSession: { answer: ['language'] }
        }
      ]
    },
    {
      id: 4367,
      type: 'Tasks::TrueFalse',
      title: 'true/false',
      items: [
        {
          id: 8082,
          type: 'TaskItems::TrueFalse',
          statement: 'falthy statement',
          position: 2,
          correct: false,
          itemSession: { answer: true }
        },
        {
          id: 8081,
          type: 'TaskItems::TrueFalse',
          statement: 'truthy statement',
          position: 1,
          correct: true,
          itemSession: { answer: true }
        }
      ]
    },
    {
      id: 4368,
      type: 'Tasks::FillInTable',
      title: 'fill in table',
      columns: 2,
      h1: null,
      h2: null,
      h3: null,
      questionFormat: 'text',
      audioQuestionFormat: false,
      items: [
        {
          id: 8085,
          type: 'TaskItems::FillInTable',
          question: 'second question',
          audioURL: null,
          position: 2,
          options: [{ id: 3010, answers: ['ans22'] }],
          itemSession: { answer: ['asdd', 'aaa'] }
        },
        {
          id: 8084,
          type: 'TaskItems::FillInTable',
          question: 'first question',
          audioURL: null,
          position: 1,
          options: [{ id: 3009, answers: ['ans', 'ans1'] }],
          itemSession: { answer: ['ans1', 'ad'] }
        },
        {
          id: 8087,
          type: 'TaskItems::FillInTable',
          question: 'fourth',
          audioURL: null,
          position: 4,
          options: [
            { id: 3012, answers: ['ansss'] },
            { id: 3013, answers: ['answ22'] }
          ],
          itemSession: { answer: ['asd', 'qsqf'] }
        },
        {
          id: 8086,
          type: 'TaskItems::FillInTable',
          question: 'third question',
          audioURL: null,
          position: 3,
          options: [{ id: 3011, answers: ['ans33'] }],
          itemSession: { answer: ['asdc', 'axc'] }
        }
      ]
    }
  ]
};

export default lessonFinishedAnswersListMock;
