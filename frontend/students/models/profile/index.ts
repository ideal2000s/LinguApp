import { IStudentTargetLanguage } from './StudentTargetLanguage';
import { IStudentSupportLanguage } from './StudentSupportLanguage';

export interface IProfile {
  id: number;
  email: string;
  fname: string;
  lname: string;
  ssn: string;
  gender: string;
  locale: string | null;
  nativeLocale: string | null;
  nativeLanguageId: number | null;
  activeStudentTargetLanguageId: number | null;
  studentTargetLanguages: Array<IStudentTargetLanguage>;
  studentSupportLanguages: Array<IStudentSupportLanguage>;
  avatarURL: string | null;
  valid: boolean;
}

export type tOnboardingStep = 'TARGET_LANGUAGE' | 'NATIVE_LANGUAGE';
export * from './StudentTargetLanguage';
export * from './StudentSupportLanguage';
