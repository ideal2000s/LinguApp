import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { replace } from 'connected-react-router';
import { ILesson } from 'students/models';
import { tApiService } from 'students/utils/apiService';
import { tAppState, tAppDispatch } from 'students/stores/rootStore';
import { modalActions } from 'students/stores/modal';

import LessonsApi from './api';
import { getLessonPathFromUrl } from '../../_utils/helpers';

type tLessonState = ILesson | null;
const initialLessonState: tLessonState = null;

const fetchLesson = createAsyncThunk<
  ILesson,
  ILesson['id'],
  { extra: { apiService: tApiService } }
>('lesson/fetchLesson_request', async (lessonId, { extra: { apiService } }) => {
  const api = new LessonsApi(apiService);
  const { lesson } = await api.fetchLesson(lessonId);
  return lesson;
});

const goToLesson = createAsyncThunk<
  void,
  ILesson['id'],
  { dispatch: tAppDispatch; state: tAppState }
>('lesson/goToLesson', (lessonId, { dispatch, getState }) => {
  const {
    router: {
      location: { pathname }
    }
  } = getState();
  const lessonPath = getLessonPathFromUrl(pathname, lessonId);
  dispatch(replace(lessonPath));
});

const followTeam = createAsyncThunk<
  void,
  number,
  { extra: { apiService: tApiService }; state: tAppState }
>('lesson/followTeam_request', async (teamId, { extra: { apiService } }) => {
  const api = new LessonsApi(apiService);

  await api.followTeam(teamId);
});

const unfollowTeam = createAsyncThunk<
  void,
  number,
  { extra: { apiService: tApiService }; state: tAppState }
>('lesson/unfollowTeam_request', async (teamId, { extra: { apiService } }) => {
  const api = new LessonsApi(apiService);

  await api.unfollowTeam(teamId);
});

const toggleFollowTeam = createAsyncThunk<
  void,
  { teamId: number; follow: boolean },
  { dispatch: tAppDispatch }
>('lesson/toggleFollowTeam', async ({ teamId, follow }, { dispatch }) => {
  if (follow) {
    dispatch(followTeam(teamId));
    dispatch(actions.updateFollowersNumber('inc'));
  } else {
    dispatch(unfollowTeam(teamId));
    dispatch(actions.updateFollowersNumber('dec'));
  }
});

const showLessonLicenseModal = createAsyncThunk<
  void,
  void,
  { dispatch: tAppDispatch; state: tAppState }
>('lesson/checkLicense', async (_, { dispatch, getState }) => {
  const {
    router: {
      location: { pathname }
    }
  } = getState();

  const preparedPath = getLessonPathFromUrl(pathname);
  if (preparedPath !== pathname) {
    dispatch(replace(preparedPath));
  }
  dispatch(modalActions.open('noLicenseModal'));
});

const lessonSlice = createSlice({
  name: 'lesson',
  initialState: initialLessonState as tLessonState,
  reducers: {
    updateFollowersNumber: (state, action: PayloadAction<'inc' | 'dec'>) => {
      if (state?.team) {
        switch (action.payload) {
          case 'inc':
            state.team.followersCount = state.team.followersCount + 1;
            state.team.isFollowing = true;
            break;
          case 'dec':
            state.team.followersCount = state.team.followersCount - 1;
            state.team.isFollowing = false;
            break;
        }
      }
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLesson.pending, () => {
      return initialLessonState;
    });

    builder.addCase(fetchLesson.fulfilled, (_, action) => {
      return action.payload;
    });

    builder.addCase(followTeam.rejected, (state) => {
      if (state?.team) {
        state.team.followersCount = state.team.followersCount - 1;
        state.team.isFollowing = false;
      }
    });

    builder.addCase(unfollowTeam.rejected, (state) => {
      if (state?.team) {
        state.team.followersCount = state.team.followersCount + 1;
        state.team.isFollowing = true;
      }
    });
  }
});

const { reducer, actions } = lessonSlice;

export { fetchLesson, goToLesson, toggleFollowTeam, showLessonLicenseModal };
export default reducer;
