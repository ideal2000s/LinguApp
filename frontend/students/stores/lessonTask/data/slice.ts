import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { replace } from 'connected-react-router';
import { tLessonTask, ILessonTaskApiResponse, ILesson } from 'students/models';
import { tApiService } from 'students/utils/apiService';
import { tAppDispatch, tAppState } from 'students/stores/rootStore';

import LessonTaskApi from './api';
import { getLessonPathFromUrl } from '../../_utils/helpers';

type tLessonTaskState = ILessonTaskApiResponse['task'];
const initialLessonTaskState: tLessonTaskState = null;

const fetchLessonTask = createAsyncThunk<
  tLessonTask | null,
  {
    lessonId: ILesson['id'];
    taskId: tLessonTask['id'];
  },
  { extra: { apiService: tApiService } }
>(
  'lessonTask/fetchLessonTask_request',
  async ({ taskId, lessonId }, { extra: { apiService } }) => {
    const api = new LessonTaskApi(apiService);
    const { task } = await api.fetchLessonTask(lessonId, taskId);
    return task;
  }
);

const exitLessonTask = createAsyncThunk<
  void,
  void,
  { dispatch: tAppDispatch; state: tAppState }
>('lessonTask/exitLessonTask', (_, { dispatch, getState }) => {
  const pathname = getState().router.location.pathname;

  dispatch(actions.drop());
  dispatch(replace(getLessonPathFromUrl(pathname)));
});

const lessonTaskSlice = createSlice({
  name: 'lessonTask',
  initialState: initialLessonTaskState as tLessonTaskState,
  reducers: {
    drop: () => {
      return initialLessonTaskState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLessonTask.fulfilled, (_, action) => {
      return action.payload;
    });
  }
});

const { reducer, actions } = lessonTaskSlice;
export const dataActions = { ...actions, fetchLessonTask, exitLessonTask };

export default reducer;
