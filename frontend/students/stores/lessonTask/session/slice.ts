import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { replace } from 'connected-react-router';
import {
  tLessonTask,
  ITaskSessionApiResponse,
  ILessonSession,
  ITaskSession,
  ILesson,
  tAnswer
} from 'students/models';
import { tApiService } from 'students/utils/apiService';
import { tAppDispatch, tAppState } from 'students/stores/rootStore';

import LessonTaskSessionApi from './api';
import { dataActions } from '../data';
import lessonTaskSelectors from '../selectors';
import { getLessonPathFromUrl } from '../../_utils/helpers';

type tLessonTaskSessionState = ITaskSession | null;
const initialLessonTaskSessionState: tLessonTaskSessionState = null;

const fetchLessonTaskSession = createAsyncThunk<
  ITaskSession | null,
  { lessonId: ILesson['id']; taskId: tLessonTask['id'] },
  { extra: { apiService: tApiService } }
>(
  'lessonTaskSession/fetchSession_request',
  async ({ lessonId, taskId }, { extra: { apiService } }) => {
    const api = new LessonTaskSessionApi(apiService);

    const { taskSession } = await api.fetchTaskSession(lessonId, taskId);

    return taskSession;
  }
);

const submitAnswersLessonTask = createAsyncThunk<
  void,
  {
    taskSession: ITaskSession;
    answers: tAnswer;
  },
  { extra: { apiService: tApiService }; dispatch: tAppDispatch }
>(
  'lessonTaskSession/submitAnswersLessonTask_request',
  async ({ taskSession, answers }, { extra: { apiService } }) => {
    if (taskSession && answers) {
      const api = new LessonTaskSessionApi(apiService);

      await api.submitAnswersLessonTask(taskSession.url, answers);
    }
  }
);

const completeLessonTask = createAsyncThunk<
  ITaskSessionApiResponse['taskSession'],
  { lessonSessionId: ILessonSession['id']; taskSessionId: ITaskSession['id'] },
  { extra: { apiService: tApiService } }
>(
  'lessonTaskSession/completeLessonTask_request',
  async ({ taskSessionId, lessonSessionId }, { extra: { apiService } }) => {
    const api = new LessonTaskSessionApi(apiService);

    const { taskSession } = await api.completeLessonTask(lessonSessionId, taskSessionId);
    return taskSession;
  }
);

const nextLessonTask = createAsyncThunk<
  void,
  { lessonSessionId: ILessonSession['id'] },
  { extra: { apiService: tApiService }; dispatch: tAppDispatch; state: tAppState }
>(
  'lessonTaskSession/nextLessonTask_request',
  async ({ lessonSessionId }, { extra: { apiService }, dispatch, getState }) => {
    const api = new LessonTaskSessionApi(apiService);
    const {
      router: {
        location: { pathname }
      }
    } = getState();
    let nextPath = 'tasks';
    try {
      const { taskSession } = await api.nextLessonTaskSession(lessonSessionId);
      nextPath = `tasks/${taskSession.taskId.toString()}`;
    } catch (error) {
      if (error.response.status === 404) {
        nextPath = 'tasks/finished';
      } else {
        throw error;
      }
    }
    const path = getLessonPathFromUrl(pathname) + `/${nextPath}`;
    dispatch(replace(path));
  }
);

const finishLessonTask = createAsyncThunk<
  Promise<any>,
  {
    lessonSessionId: ILessonSession['id'];
    taskSessionId: ITaskSession['id'];
    answers?: tAnswer;
  },
  { dispatch: tAppDispatch; state: tAppState }
>(
  'lessonTaskSession/finishLessonTask_request',
  async ({ lessonSessionId, taskSessionId, answers }, { dispatch, getState }) => {
    const taskSession = lessonTaskSelectors.selectLessonTaskSession(getState());

    if (taskSession?.id === taskSessionId) {
      if (answers) {
        await dispatch(
          submitAnswersLessonTask({
            taskSession,
            answers
          })
        );
      }
      await dispatch(completeLessonTask({ lessonSessionId, taskSessionId }));
    }
  }
);

const finishAndNextLessonTask = createAsyncThunk<
  Promise<any>,
  {
    lessonSessionId: ILessonSession['id'];
    taskSessionId: ITaskSession['id'];
    answers?: tAnswer;
  },
  { dispatch: tAppDispatch; state: tAppState }
>(
  'lessonTaskSession/finishAndNextLessonTask_request',
  async ({ lessonSessionId, taskSessionId, answers }, { dispatch }) => {
    await dispatch(finishLessonTask({ lessonSessionId, taskSessionId, answers }));

    await dispatch(nextLessonTask({ lessonSessionId }));
  }
);

const goToGame = createAsyncThunk<
  void,
  string,
  { dispatch: tAppDispatch; state: tAppState }
>('lessonTaskSession/goToGame_request', async (gameName, { getState, dispatch }) => {
  const lessonPath = getLessonPathFromUrl(getState().router.location.pathname);
  lessonPath && dispatch(replace(`${lessonPath}/play/${gameName}`));
});

const heartBeat = createAsyncThunk<
  void,
  void,
  { extra: { apiService: tApiService }; state: tAppState }
>(
  'lessonTaskSession/heartBeat_request',
  async (_, { extra: { apiService }, getState }) => {
    const taskSession = lessonTaskSelectors.selectLessonTaskSession(getState());
    if (taskSession) {
      const api = new LessonTaskSessionApi(apiService);

      await api.heartBeat(taskSession.url);
    }
  }
);

const getNextTaskSession = createAsyncThunk<
  Promise<ITaskSession | null>,
  void,
  { extra: { apiService: tApiService }; state: tAppState }
>(
  'lessonTaskSession/submitAnswersTask_request',
  async (_, { extra: { apiService }, getState }) => {
    const lessonSessionId = getState().lesson.session?.id;
    if (!lessonSessionId) return null;
    const api = new LessonTaskSessionApi(apiService);

    try {
      const { taskSession } = await api.nextLessonTaskSession(lessonSessionId);
      return taskSession;
    } catch (_e) {
      return null;
    }
  }
);

const lessonTaskSessionSlice = createSlice({
  name: 'lessonTaskSession',
  initialState: initialLessonTaskSessionState as tLessonTaskSessionState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLessonTaskSession.pending, () => {
      return initialLessonTaskSessionState;
    });
    builder.addCase(fetchLessonTaskSession.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(completeLessonTask.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(dataActions.exitLessonTask.fulfilled, () => {
      return initialLessonTaskSessionState;
    });
  }
});

const { reducer } = lessonTaskSessionSlice;
export const sessionActions = {
  fetchLessonTaskSession,
  submitAnswersLessonTask,
  completeLessonTask,
  nextLessonTask,
  finishLessonTask,
  finishAndNextLessonTask,
  heartBeat,
  goToGame,
  getNextTaskSession
};
export default reducer;
