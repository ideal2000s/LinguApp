import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  IGameplay,
  IGameplayParams,
  ILesson,
  ILessonGameplaysApiResponse
} from 'students/models';

import GameplaysApi from './api';
import { tApiService } from 'students/utils/apiService';

type tGameplay = ILessonGameplaysApiResponse | null;
const initialGameplays: tGameplay = null;

const createLessonGameplay = createAsyncThunk<
  ILessonGameplaysApiResponse,
  ILesson['id'],
  { extra: { apiService: tApiService } }
>(
  'gameplays/fetchGameplayCreate_request',
  async (lessonId, { extra: { apiService } }) => {
    const api = new GameplaysApi(apiService);
    const gameplay = await api.fetchCreateGameplay(lessonId);
    return gameplay;
  }
);

const playStudentWord = createAsyncThunk<
  void,
  { wordId: number; solved: boolean },
  { extra: { apiService: tApiService } }
>(
  'gameplays/fetchPlayStudentWord_request',
  async ({ wordId, solved }, { extra: { apiService } }) => {
    const api = new GameplaysApi(apiService);
    await api.fetchPlayStudentWord(wordId, solved);
  }
);

const finishLessonGameplay = createAsyncThunk<
  void,
  { lessonId: ILesson['id']; gameplayId: IGameplay['id']; params: IGameplayParams },
  { extra: { apiService: tApiService } }
>(
  'gameplays/fetchFinishGameplay_request',
  async ({ lessonId, gameplayId, params }, { extra: { apiService } }) => {
    const api = new GameplaysApi(apiService);
    await api.fetchFinishGameplay(lessonId, gameplayId, params);
  }
);

const gamplaysSlice = createSlice({
  name: 'gameplays',
  initialState: initialGameplays as tGameplay,
  reducers: {
    drop: () => initialGameplays
  },
  extraReducers: (builder) => {
    builder.addCase(createLessonGameplay.fulfilled, (_, action) => {
      return action.payload;
    });
  }
});

const { reducer, actions } = gamplaysSlice;
export const gameplaysActions = {
  createLessonGameplay,
  playStudentWord,
  finishLessonGameplay,
  ...actions
};
export default reducer;
