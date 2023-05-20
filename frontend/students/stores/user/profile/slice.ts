import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  IProfile,
  tStudentTargetLanguage,
  IStudentTargetLanguageCreateApiResponse,
  IStudentTargetLanguageUpdateApiResponse,
  IStudentTargetLanguageUpdateApiRequest,
  tStudentSupportLanguage,
  IStudentSupportLanguage,
  IStudentSupportLanguagesCreateApiResponse
} from 'students/models';
import { tApiService } from 'students/utils/apiService';
import { tAppDispatch, tAppState } from 'students/stores/rootStore';

import ProfileApi from './api';

type tProfileState = IProfile | null;
const initialProfileState: tProfileState = null;

const getProfile = createAsyncThunk<
  IProfile,
  void,
  { extra: { apiService: tApiService } }
>('profile/getProfile_request', async (_, { extra: { apiService } }) => {
  const api = new ProfileApi(apiService);

  const profileData = await api.getProfile();
  return profileData;
});

const updateProfile = createAsyncThunk<
  IProfile,
  Partial<IProfile>,
  { extra: { apiService: tApiService }; dispatch: tAppDispatch }
>(
  'profile/updateProfile_request',
  async (profileData, { extra: { apiService }, dispatch }) => {
    const api = new ProfileApi(apiService);

    const newProfile = await api.updateProfile(profileData);
    dispatch(actions.setProfile(newProfile));
    return newProfile;
  }
);

const createStudentTargetLanguage = createAsyncThunk<
  IStudentTargetLanguageCreateApiResponse['studentTargetLanguage'],
  tStudentTargetLanguage,
  { extra: { apiService: tApiService } }
>(
  'profile/createStudentTargetLanguage_request',
  async (targetLanguageData, { extra: { apiService } }) => {
    const api = new ProfileApi(apiService);

    const newProfile = await api.createStudentTargetLanguage(targetLanguageData);
    return newProfile.studentTargetLanguage;
  }
);

const updateStudentTargetLanguage = createAsyncThunk<
  IStudentTargetLanguageUpdateApiResponse['studentTargetLanguage'],
  IStudentTargetLanguageUpdateApiRequest['studentTargetLanguage'],
  { extra: { apiService: tApiService } }
>(
  'profile/updateStudentTargetLanguage_request',
  async (targetLanguageData, { extra: { apiService } }) => {
    const api = new ProfileApi(apiService);

    const newProfile = await api.updateStudentTargetLanguage(targetLanguageData);
    return newProfile.studentTargetLanguage;
  }
);

const selectStudentTargetLanguage = createAsyncThunk<
  unknown,
  tStudentTargetLanguage,
  {
    dispatch: tAppDispatch;
    state: tAppState;
  }
>(
  'profile/updateStudentTargetLanguage',
  async (studentTargetLang, { dispatch, getState }) => {
    const profileState = getState().user.profile;

    if (profileState) {
      const { studentTargetLanguages } = profileState;
      const existingStudentTargetLanguage = studentTargetLanguages.find(
        (lang) => lang.languageId === studentTargetLang.languageId
      );
      if (existingStudentTargetLanguage) {
        return dispatch(
          updateStudentTargetLanguage({
            ...existingStudentTargetLanguage,
            ...studentTargetLang
          })
        );
      } else {
        return dispatch(createStudentTargetLanguage(studentTargetLang));
      }
    }
    return null;
  }
);

const createStudentSupportLanguage = createAsyncThunk<
  IStudentSupportLanguagesCreateApiResponse['studentSupportLanguages'],
  tStudentSupportLanguage,
  { extra: { apiService: tApiService } }
>(
  'profile/createStudentSupportLanguage_request',
  async (supportLanguages, { extra: { apiService } }) => {
    const api = new ProfileApi(apiService);
    const { studentSupportLanguages } = await api.createStudentSupportLanguages(
      supportLanguages
    );

    return studentSupportLanguages;
  }
);

const selectStudentSupportLanguage = createAsyncThunk<
  IProfile,
  {
    mainLanguageId: number;
    englishLanguageId?: number;
  },
  {
    dispatch: tAppDispatch;
    state: tAppState;
    extra: { apiService: tApiService };
  }
>(
  'profile/updateStudentSupportLanguage',
  async (
    { mainLanguageId, englishLanguageId },
    { extra: { apiService }, dispatch, getState }
  ) => {
    const api = new ProfileApi(apiService);
    const profileState = getState().user.profile;

    if (profileState) {
      const { studentSupportLanguages } = profileState;

      // First: if main language is not yet created - create a new one
      const existingStudentSupportLanguage = studentSupportLanguages.find(
        (lang: IStudentSupportLanguage) => lang.languageId === mainLanguageId
      );

      if (!existingStudentSupportLanguage) {
        await dispatch(
          createStudentSupportLanguage({ languageId: mainLanguageId, native: true })
        );
      } else {
        await api.updateStudentSupportLanguage({
          id: existingStudentSupportLanguage.id,
          languageId: mainLanguageId,
          native: true
        });
      }

      // Second: if main language is not English - create new studentSupportLanguage
      if (englishLanguageId) {
        const existingEnglishSupportLanguage = studentSupportLanguages.find(
          (lang: IStudentSupportLanguage) => lang.languageId === englishLanguageId
        );

        if (!existingEnglishSupportLanguage) {
          await dispatch(
            createStudentSupportLanguage({ languageId: englishLanguageId, native: false })
          );
        }
      }
    }

    return await api.getProfile();
  }
);

const updateProfileLocale = createAsyncThunk<
  IProfile,
  IProfile['locale'],
  { extra: { apiService: tApiService }; dispatch: tAppDispatch }
>('profile/updateStudentLocal_request', async (locale, { extra: { apiService } }) => {
  const api = new ProfileApi(apiService);

  return await api.updateProfile({ locale });
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState as tProfileState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfile>) => {
      return action.payload;
    },
    removeProfile: () => {
      return initialProfileState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (_, action) => action.payload);
    builder.addCase(updateProfileLocale.fulfilled, (_, action) => action.payload);
    builder.addCase(selectStudentSupportLanguage.fulfilled, (state, action) => {
      if (state) {
        state.studentSupportLanguages.push(...action.payload.studentSupportLanguages);
        state.nativeLanguageId = action.payload.nativeLanguageId;
      }
    });
    builder.addCase(createStudentTargetLanguage.fulfilled, (state, action) => {
      if (state) {
        state.studentTargetLanguages.push(action.payload);
        state.activeStudentTargetLanguageId = action.payload.id;
      }
    });
    builder.addCase(updateStudentTargetLanguage.fulfilled, (state, action) => {
      if (state) {
        const index = state.studentTargetLanguages.findIndex(
          (lang) => lang.id === action.payload.id
        );
        state.studentTargetLanguages[index] = action.payload;
        state.activeStudentTargetLanguageId = action.payload.id;
      }
    });
  }
});

const { reducer, actions } = profileSlice;
export default reducer;
export const profileActions = {
  getProfile,
  updateProfile,
  selectStudentTargetLanguage,
  selectStudentSupportLanguage,
  updateProfileLocale,
  ...actions
};
