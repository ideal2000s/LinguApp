import {
  IProfile,
  IStudentSupportLanguagesCreateApiRequest,
  IStudentSupportLanguagesCreateApiResponse,
  IStudentSupportLanguagesUpdateApiRequest,
  IStudentSupportLanguagesUpdateApiResponse,
  IStudentTargetLanguageCreateApiRequest,
  IStudentTargetLanguageCreateApiResponse,
  IStudentTargetLanguageUpdateApiRequest,
  IStudentTargetLanguageUpdateApiResponse
} from 'students/models';
import { BaseApiService } from 'students/utils/apiService';

class ProfileApi extends BaseApiService {
  async getProfile(): Promise<IProfile> {
    const { data } = await this.apiService(`/profile`);
    return data;
  }

  async updateProfile(profileData: Partial<IProfile>): Promise<IProfile> {
    const { data } = await this.apiService(`/profile`, {
      method: 'PUT',
      data: { student: profileData }
    });

    return data;
  }

  async createStudentTargetLanguage(
    studentTargetLanguage: IStudentTargetLanguageCreateApiRequest['studentTargetLanguage']
  ): Promise<IStudentTargetLanguageCreateApiResponse> {
    const { data } = await this.apiService(`/profile/student_target_languages`, {
      method: 'POST',
      data: { studentTargetLanguage }
    });

    return data;
  }

  async updateStudentTargetLanguage(
    studentTargetLanguage: IStudentTargetLanguageUpdateApiRequest['studentTargetLanguage']
  ): Promise<IStudentTargetLanguageUpdateApiResponse> {
    const { data } = await this.apiService(
      `/profile/student_target_languages/${studentTargetLanguage.id}`,
      {
        method: 'PUT',
        data: { studentTargetLanguage }
      }
    );

    return data;
  }

  async createStudentSupportLanguages(
    studentSupportLanguages: IStudentSupportLanguagesCreateApiRequest['studentSupportLanguages']
  ): Promise<IStudentSupportLanguagesCreateApiResponse> {
    const { data } = await this.apiService(`/profile/student_support_languages`, {
      method: 'POST',
      data: { studentSupportLanguages }
    });

    return data;
  }

  async updateStudentSupportLanguage(
    studentSupportLanguages: IStudentSupportLanguagesUpdateApiRequest['studentSupportLanguages']
  ): Promise<IStudentSupportLanguagesUpdateApiResponse> {
    const { data } = await this.apiService(
      `/profile/student_support_languages/${studentSupportLanguages.id}`,
      {
        method: 'PUT',
        data: { studentSupportLanguages }
      }
    );

    return data;
  }
}

export default ProfileApi;
