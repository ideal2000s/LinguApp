import {
  IProfile,
  IStudentMailSignUpRequest,
  IStudentMailSignInRequest,
  IStudentVerifyOTP
} from 'students/models';
import { BaseApiService } from 'students/utils/apiService';
import { updateAuthTokens } from '../_utils/authToken';

class AuthApi extends BaseApiService {
  async mailSignIn(student: IStudentMailSignInRequest['student']): Promise<IProfile> {
    const {
      data: { authenticityToken, profile }
    } = await this.apiService(`/students/sign_in`, {
      method: 'POST',
      data: { student }
    });

    updateAuthTokens({ csrf: authenticityToken });

    return profile;
  }

  async mailSignUp(student: IStudentMailSignUpRequest['student']): Promise<IProfile> {
    /* TODO what's returned?? */
    const { data } = await this.apiService(`/students/sign_up`, {
      method: 'POST',
      data: { student }
    });

    return data;
  }

  async getOTP(student: IStudentVerifyOTP['student']): Promise<any> {
    /* TODO what's returned?? */
    const { data } = await this.apiService(`/students/otp`, {
      method: 'POST',
      data: { student }
    });

    return data;
  }

  // If no data is returned - Axios returns an empty string ""
  async signOut(): Promise<void> {
    const {
      data: { authenticityToken }
    } = await this.apiService(`/students/sign_out`, { method: 'POST' });

    updateAuthTokens({ csrf: authenticityToken });
  }
}

export default AuthApi;
