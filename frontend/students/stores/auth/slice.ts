import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  IAuth,
  IStudentMailSignUpRequest,
  IStudentMailSignInRequest,
  IStudentVerifyOTP
} from 'students/models';
import { tApiService } from 'students/utils/apiService';
import { tAppState, tAppDispatch } from '../rootStore';

import AuthApi from './api';

import { profileActions } from '../user';
import { modalActions } from '../modal';
import { lessonTaskActions } from '../lessonTask';
import { dropLessonSession } from '../lesson';

const initialAuthState: IAuth = {
  modal: {
    show: false,
    isSignUp: false
  },
  tempUser: null
};

const validateProfile = createAsyncThunk<
  void,
  void,
  { dispatch: tAppDispatch; state: tAppState; extra: { apiService: tApiService } }
>('auth/validateProfile', async (_, { dispatch, getState }) => {
  const { profile } = getState().user;

  profile && !profile.valid && dispatch(modalActions.open('profileValidation'));
});

const checkAuth = createAsyncThunk<
  void,
  void,
  { dispatch: tAppDispatch; extra: { apiService: tApiService } }
>('auth/checkAuth_request', async (_, { dispatch }) => {
  const response = await dispatch(profileActions.getProfile());

  if (profileActions.getProfile.fulfilled.match(response)) {
    dispatch(validateProfile());
  }
});

const mailSignIn = createAsyncThunk<
  unknown,
  IStudentMailSignInRequest['student'],
  { dispatch: tAppDispatch; extra: { apiService: tApiService }; rejectValue: string }
>(
  'auth/mailSignIn_request',
  async (student, { dispatch, extra: { apiService }, rejectWithValue }) => {
    const api = new AuthApi(apiService);

    try {
      const profile = await api.mailSignIn(student);
      const setProfilePromise = dispatch(profileActions.setProfile(profile));
      dispatch(actions.close());
      dispatch(validateProfile());
      return setProfilePromise;
    } catch (error) {
      if (error?.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error?.response?.data?.errors) {
        const errorKey = Object.keys(error.response.data.errors)[0];
        const errorMessage = `${errorKey} ${error.response.data.errors[errorKey]}`;

        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('Error happened while trying to sign you in');
    }
  }
);

const mailSignUp = createAsyncThunk<
  unknown,
  IStudentMailSignUpRequest['student'],
  {
    extra: { apiService: tApiService };
    rejectValue: string;
  }
>(
  'auth/mailSignUp_request',
  async (student, { extra: { apiService }, rejectWithValue }) => {
    const api = new AuthApi(apiService);

    try {
      await api.mailSignUp(student);
      return;
    } catch (error) {
      if (error?.response?.data?.errors) {
        const errorKey = Object.keys(error.response.data.errors)[0];
        const errorMessage = `${errorKey} ${error.response.data.errors[errorKey]}`;

        return rejectWithValue(errorMessage);
      }

      return rejectWithValue('Error happened while trying to sign you up');
    }
  }
);

const getOTP = createAsyncThunk<
  unknown,
  IStudentVerifyOTP['student'],
  {
    dispatch: tAppDispatch;
    extra: { apiService: tApiService };
    rejectValue: string;
  }
>(
  'auth/getOTP_request',
  async (student, { extra: { apiService }, dispatch, rejectWithValue }) => {
    dispatch(actions.setTempUser(student));

    const api = new AuthApi(apiService);

    try {
      await api.getOTP(student);

      return student;
    } catch (error) {
      return rejectWithValue(
        error?.response?.statusText || 'Error happened while trying to generate OTP'
      );
    }
  }
);

const logOut = createAsyncThunk<
  unknown,
  void,
  { dispatch: tAppDispatch; extra: { apiService: tApiService } }
>('auth/logOut_request', async (_, { dispatch, extra: { apiService } }) => {
  const api = new AuthApi(apiService);
  await api.signOut();

  dispatch(profileActions.removeProfile());
  dispatch(lessonTaskActions.drop());
  dispatch(dropLessonSession());
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setTempUser: (state, action: PayloadAction<IAuth['tempUser']>) => {
      state.tempUser = action.payload;
    },
    open: (state) => {
      state.modal.show = true;
      state.modal.isSignUp = initialAuthState.modal.isSignUp;
      state.tempUser = null;
    },
    close: (state) => {
      state.modal.show = initialAuthState.modal.show;
      state.modal.isSignUp = initialAuthState.modal.isSignUp;
      state.tempUser = null;
    },
    toggleVariant: (state) => {
      state.modal.isSignUp = !state.modal.isSignUp;
    }
  }
});

const { reducer, actions } = authSlice;

const needAuthCheck = createAsyncThunk<
  void,
  (_: any) => Promise<any>,
  { dispatch: tAppDispatch; state: tAppState }
>('auth/check', async (thunkToCall, { getState, dispatch }) => {
  if (!getState().user.profile) {
    dispatch(actions.open());
  } else {
    return dispatch(thunkToCall);
  }
});

const exportActions = {
  checkAuth,
  mailSignIn,
  mailSignUp,
  getOTP,
  needAuthCheck,
  logOut,
  ...actions
};

export { exportActions as actions };

export default reducer;
