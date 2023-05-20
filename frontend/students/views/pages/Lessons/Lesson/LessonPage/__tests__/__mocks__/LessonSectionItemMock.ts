import { ILesson, ITaskSectionProgress } from 'students/models';

export const mockSectionData: ITaskSectionProgress = {
  title: 'test',
  progress: 50,
  tasks: [
    {
      id: 1,
      progress: 100,
      title: 'task1'
    },
    {
      id: 2,
      progress: 0,
      title: 'task2'
    }
  ]
};

export const mockLesson: ILesson = {
  id: 1,
  averageDuration: 10,
  phrasesCount: 15,
  newPhrasesCount: 15,
  image: null,
  imageURL: null,
  description: '',
  author: null,
  team: null,
  objectives: [''],
  title: '',
  color: null,
  languageCode: 'en',
  level: 'a1',
  subjects: [
    {
      subject: 'teach',
      tasks: [
        {
          id: 1,
          name: 'Learn Task #1'
        },
        {
          id: 2,
          name: 'Learn Task #2'
        }
      ]
    }
  ],
  course: {
    courseId: 1,
    coursePath: '/courses/course-name',
    nextCourseLessonId: 2,
    title: 'Course name'
  },
  kind: 'tet',
  language: {
    code: 'en',
    name: 'English',
    id: 1
  },
  supportLanguage: null
};
