import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { ILesson, ILessonSession, ILessonSessionApiResponse } from 'students/models';

import LessonSessionApi from './api';
import { tApiService } from 'students/utils/apiService';
import { tAppState, tAppDispatch } from 'students/stores/rootStore';
import { userSelectors } from 'students/stores/user';

type tLessonSession = ILessonSession | null;
const initialLessonSessionState: tLessonSession = null;

const fetchLessonSession = createAsyncThunk<
  ILessonSessionApiResponse['lessonSession'],
  ILesson['id'],
  { extra: { apiService: tApiService } }
>('lessonSession/fetchSession_request', async (lessonId, { extra: { apiService } }) => {
  const api = new LessonSessionApi(apiService);
  const { lessonSession } = await api.fetchLessonSession(lessonId);
  return lessonSession;
});

const fetchLessonSessionIfAuthorized = createAsyncThunk<
  void,
  ILesson['id'],
  { state: tAppState; dispatch: tAppDispatch }
>('lessonSession/fetchSessionIfAuthorized', async (lessonId, { getState, dispatch }) => {
  const profile = userSelectors.selectProfile(getState());

  if (profile) {
    dispatch(fetchLessonSession(lessonId));
  }
});

const startLessonSession = createAsyncThunk<
  ILessonSessionApiResponse['lessonSession'],
  ILesson['id'],
  { extra: { apiService: tApiService } }
>('lessonSession/startSession_request', async (lessonId, { extra: { apiService } }) => {
  const api = new LessonSessionApi(apiService);
  const { lessonSession } = await api.startLessonSession(lessonId);
  return lessonSession;
});

const runLesson = createAsyncThunk<
  any,
  ILesson['id'],
  { state: tAppState; dispatch: tAppDispatch }
>('lessonSession/runLesson', async (lessonId, { getState, dispatch }) => {
  const {
    lesson: { session },
    router: {
      location: { pathname }
    }
  } = getState();
  const preparedPath = pathname.replace(/\/$/, '');
  const needNewLessonSession = !(session && session.status === 'active');
  if (needNewLessonSession) {
    const resultAction = await dispatch(startLessonSession(lessonId));
    if (startLessonSession.fulfilled.match(resultAction) && resultAction.payload) {
      return dispatch(push(`${preparedPath}/tasks/${resultAction.payload.taskId}`));
    }
  } else if (session) {
    return dispatch(push(`${preparedPath}/tasks/${session.taskId}`));
  }
  return null;
});

const studentSlice = createSlice({
  name: 'lessonSession',
  initialState: initialLessonSessionState as tLessonSession,
  reducers: {
    drop: () => {
      return initialLessonSessionState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLessonSession.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(fetchLessonSession.rejected, () => {
      return initialLessonSessionState;
    });
    builder.addCase(startLessonSession.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

const {
  reducer,
  actions: { drop: dropLessonSession }
} = studentSlice;

export {
  fetchLessonSession,
  fetchLessonSessionIfAuthorized,
  startLessonSession,
  dropLessonSession,
  runLesson
};
export default reducer;
