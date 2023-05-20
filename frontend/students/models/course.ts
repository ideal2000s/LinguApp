import { ILesson, ILanguage, ILessonAuthor, ILessonTeam } from 'students/models';

/*
 * Note:
 *   There are two types of Course interfaces:
 *   1) the one on the Lessons Catalog page - ICatalogCourse
 *   2) the one on the Course details page - ICourseDetails
 *
 * In future we probably need to merge this two types into one.
 * */

export interface ICourseDetails {
  author: ILessonAuthor;
  color: string | null;
  coursePath: string;
  courseSections: ICourseDetailsSection[];
  description: string;
  estimatedTime: number;
  id: number;
  imageURL: string | null;
  languageCode: string; // [TODO] unnecessary!
  language: ILanguage;
  level: string;
  lessonsCount: number | null;
  metaDescription: string;
  reviews: ICourseDetailsReview[];
  rating: number | null;
  sectionsCount: number;
  slug: string;
  title: string;
  wordsCount: number;
}

export interface ICourseDetailsLesson {
  id: number;
  name: string;
  title: string;
  imageURL: string | null;
  author: Partial<ILessonAuthor>; // [TODO] API returns wrong structure. Update API on the backend!
  averageDuration: number | null;
  phrasesCount: number;
  ratingsCount: number;
  totalRating: number;
}

export interface ICourseDetailsSection {
  id: number;
  name: string;
  lessons: ICourseDetailsLesson[];
}

export interface ICourseDetailsReview {
  id: number;
  text: string;
  rating: number;
  author: ILessonAuthor;
  createdAt: string;
}

export interface ICourseDetailsReview {
  id: number;
  text: string;
  rating: number;
  author: ILessonAuthor;
  createdAt: string;
}

export interface ICatalogCourse {
  author: ILessonAuthor;
  color: string | null;
  coursePath: string;
  description: string;
  estimatedTime: number;
  id: number;
  imageURL: string | null;
  language: ILanguage;
  languageCode: string; // [TODO] unnecessary!
  lessonsCount: number | null;
  level: string;
  rating: number | null;
  slug: string;
  team: ILessonTeam; // [TODO] unnecessary!
  title: string;
  wordCount: number;
  wordsCount: number | null; // [TODO] unnecessary!
}

export interface ICoursesCatalog {
  courses: ICatalogCourse[];
  currentPage: number;
  limitValue: number;
  nextPage: number | null;
  prevPage: number | null;
  totalCount: number;
  totalPages: number;
}

export interface ILessonsCatalog {
  currentPage: number;
  lessons: ILesson[];
  limitValue: number;
  nextPage: number | null;
  prevPage: number | null;
  totalCount: number;
  totalPages: number;
}

export type tCatalogItemType = 'course' | 'lesson';
export type tWithCatalogItemType<T> = T & { type: tCatalogItemType };
export type tCatalogItems = Array<
  tWithCatalogItemType<ICatalogCourse> | tWithCatalogItemType<ILesson>
>;

export interface ICourseApiResponse {
  course: ICourseDetails;
}

export interface ICourseDetailsReviewsApiResponse {
  reviews: ICourseDetailsReview[];
}

export interface ICoursesCatalogApiResponse {
  coursesCatalog: ICoursesCatalog;
}

export interface ILessonsCatalogApiResponse {
  lessonsCatalog: ILessonsCatalog;
}

export interface tCourseFilterOption {
  [x: string]: string | string[] | null;
}

export type tCourseFilter = tCourseFilterOption[];
