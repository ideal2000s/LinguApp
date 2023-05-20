import { IProfile } from 'students/models/profile';

export const mockProfile: IProfile = {
  id: 29,
  email: 'uladzislau.klachkou@altoros.com',
  fname: 'Uladzislau',
  lname: 'Klachkou',
  valid: true,
  ssn: '',
  gender: 'unknown',
  locale: 'en',
  nativeLocale: 'en',
  nativeLanguageId: 147,
  activeStudentTargetLanguageId: 1,
  studentTargetLanguages: [
    {
      id: 1,
      languageId: 178,
      level: 'b1',
      active: true,
      url: '/api/profile/student_target_languages/1'
    }
  ],
  studentSupportLanguages: [
    {
      id: 1,
      languageId: 178,
      native: false
    }
  ],
  avatarURL: '/uploads/student/29/avatar/thumbnail-5b372be92f04bdecd3c370703a4b803a.jpg'
};
