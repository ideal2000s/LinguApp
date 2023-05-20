export type tLevel = 'undefined' | 'zero_level' | 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2';

export interface IStudentTargetLanguage {
  id: number;
  languageId: number;
  level: tLevel;
  active: boolean;
  url: string;
}

export type tStudentTargetLanguage = Pick<
  IStudentTargetLanguage,
  'languageId' | 'level' | 'active'
>;

// POST: profile/student_target_languages
export interface IStudentTargetLanguageCreateApiRequest {
  studentTargetLanguage: tStudentTargetLanguage;
}
export interface IStudentTargetLanguageCreateApiResponse {
  studentTargetLanguage: IStudentTargetLanguage;
}

export interface IStudentTargetLanguageUpdateApiResponse
  extends IStudentTargetLanguageCreateApiResponse {}
export interface IStudentTargetLanguageUpdateApiRequest
  extends IStudentTargetLanguageCreateApiResponse {}
