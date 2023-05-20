export interface IStudentSupportLanguage {
  id: number;
  languageId: number;
  native: boolean;
}

export type tStudentSupportLanguage = Pick<
  IStudentSupportLanguage,
  'languageId' | 'native'
>;

// POST | PUT: profile/student_support_languages
export interface IStudentSupportLanguagesCreateApiRequest {
  studentSupportLanguages: tStudentSupportLanguage;
}

export interface IStudentSupportLanguagesCreateApiResponse {
  studentSupportLanguages: IStudentSupportLanguage;
}

export interface IStudentSupportLanguagesUpdateApiResponse
  extends IStudentSupportLanguagesCreateApiResponse {}

export interface IStudentSupportLanguagesUpdateApiRequest
  extends IStudentSupportLanguagesCreateApiResponse {}
