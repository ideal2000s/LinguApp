import { IProps } from '../../IdleScreen';

export const lessonNullMock: IProps['lesson'] = null;
export const lessonDataMock: NonNullable<IProps['lesson']> = {
  id: 14,
  title: 'My first lesson',
  objectives: ['first objective', 'second one'],
  languageCode: 'de',
  phrasesCount: 0,
  newPhrasesCount: 0,
  averageDuration: 0,
  color: '#8371ce',
  image: null,
  imageURL: '/uploads/lesson/14/image/e09aefc1fbf4e197478110f6934a344b.jpg',
  description: '',
  level: 'a1',
  team: {
    id: 4,
    name: "Ron Weasley's Team",
    status: 'personal',
    followersCount: 1,
    lessonsCount: 2,
    meta: {},
    imageURL: '/uploads/user/1/avatar/2186c2ea746027686b75f3ef7b867d86.jpg',
    isFollowing: false
  },
  author: {
    name: 'Ron Weasley',
    avatarURL: '/uploads/user/1/avatar/2186c2ea746027686b75f3ef7b867d86.jpg',
    about: '',
    id: 1
  },
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
    id: 12,
    name: 'English'
  },
  supportLanguage: null
};
