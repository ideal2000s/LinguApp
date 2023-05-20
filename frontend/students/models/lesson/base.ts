import { tArrayElementType } from '../utils';
import { tLevel } from '../profile';
import { IPhrase } from '../phrase';
import { tGameType } from 'students/models/games';
enum LessonImageDerivativeTypes {
  thumbnail = 'thumbnail',
  largeBanner = 'largeBanner',
  mobileBanner = 'mobileBanner',
  cardImage = 'cardImage'
}

export type tImageCollection = {
  [key in LessonImageDerivativeTypes]: string;
};

export interface ILesson {
  author: ILessonAuthor | null;
  averageDuration: number | null;
  color: tLessonPageColor | string | null;
  course?: ILessonCourse | null;
  description: string;
  id: number;
  imageURL: string | null;
  image: tImageCollection | null;
  kind: string;
  language: ILanguage;
  languageCode: string; // [TODO] unnecessary!
  level: tLevel;
  newPhrasesCount: number;
  objectives: string[];
  phrasesCount: number;
  subjects?: ISubject[];
  team?: ILessonTeam | null;
  title: string;
  supportLanguage: ILanguage | null;
}

export interface ILessonApiResponse {
  lesson: ILesson & {
    kind: string;
    rating?: number;
  };
}

export interface ILessonAuthor {
  id: number;
  about: string | null;
  avatarURL: string | null;
  name: string;
}

export interface ILessonTeam {
  followersCount: number;
  id: number;
  imageURL: string | null;
  isFollowing?: boolean;
  lessonsCount: number;
  meta: any;
  name: string;
  status: string;
}

export const LESSON_PAGE_COLORS = [
  '#00a5d7',
  '#8dc63f',
  '#f7941e',
  '#ef4036',
  '#eb2486',
  '#8371ce',
  '#f9fafd'
] as const;

export type tLessonPageColor = tArrayElementType<typeof LESSON_PAGE_COLORS>;

export interface ILessonPhrasesApiResponse {
  lessonPhrases: IPhrase[];
}
export interface ILessonGameplaysApiResponse {
  gameplay: { id: number; gameType: tGameType };
  words: IPhrase[];
}

export interface ILessonSubjectTask {
  id: number;
  name: string;
}

export interface ISubject {
  subject: string;
  tasks: ILessonSubjectTask[];
}

interface ILessonCourse {
  courseId: number;
  coursePath: string;
  nextCourseLessonId: number | null;
  title: string;
}

export interface ILanguage {
  id: number;
  name: string;
  code: string;
}

interface ISkill {
  id: number;
  name: string;
}

export type tSkills = ISkill[];

// GET /api/skills
export interface ISkillResponse {
  skills: tSkills;
}

export interface IFilterLessonQuery {
  skills_id_in?: number | number[];
  title_cont?: string;
  with_level?: tLevel | tLevel[];
  tagged_with?: string | string[];
  language_id_eq?: number;
  with_support_language?: number | number[];
}

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface IFilterLessonQuery {
//   skills_id_in?: number | number[];
//   title_cont?: string;
//   with_level?: tLevel | tLevel[];
//   tagged_with?: string | string[];
//   language_id_eq?: number;
//   with_support_language?: number | number[];
// }
