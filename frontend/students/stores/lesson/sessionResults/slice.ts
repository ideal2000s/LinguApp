import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tApiService } from 'students/utils/apiService';
import { ITaskResultsResponse } from 'students/models/lessonTasks/results';
import LessonSessionResultsApi from './api';

const initialSessionResults: ITaskResultsResponse = {
  tasks: [],
  taskItemsPublishedCount: 0,
  taskItemsCorrectlyAnsweredCount: 0
};

const fetchLessonSessionResults = createAsyncThunk<
  ITaskResultsResponse,
  number,
  { extra: { apiService: tApiService } }
>('lessonSession/fetchResults_request', async (sessionId, { extra: { apiService } }) => {
  const api = new LessonSessionResultsApi(apiService);
  const resp = await api.fetchLessonSessionResults(sessionId);
  return resp;
});

const resultsSlice = createSlice({
  name: 'sessionResults',
  initialState: initialSessionResults as ITaskResultsResponse,
  reducers: {
    clear: () => initialSessionResults
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLessonSessionResults.fulfilled, (_, action) => {
      return action.payload;
    });

    builder.addCase(fetchLessonSessionResults.rejected, () => {
      return initialSessionResults;
    });
  }
});

const { reducer, actions } = resultsSlice;

export const resultsActions = { ...actions, fetchLessonSessionResults };

export default reducer;
