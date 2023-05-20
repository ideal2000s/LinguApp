import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ILesson, IPhrase, tLessonPhrases } from 'students/models';

import LessonsPhrasesApi from './api';
import { tApiService } from 'students/utils/apiService';

const initialLessonPhrases: tLessonPhrases = null;

const fetchLessonPhrases = createAsyncThunk<
  IPhrase[],
  ILesson['id'],
  { extra: { apiService: tApiService } }
>('lesson/fetchLessonPhrases_request', async (lessonId, { extra: { apiService } }) => {
  const api = new LessonsPhrasesApi(apiService);
  const { lessonPhrases } = await api.fetchLessonPhrases(lessonId);
  return lessonPhrases;
});

const lessonSlice = createSlice({
  name: 'phrases',
  initialState: initialLessonPhrases as tLessonPhrases,
  reducers: {
    drop: () => initialLessonPhrases
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLessonPhrases.fulfilled, (_, action) => {
      return action.payload;
    });
  }
});

const { reducer, actions } = lessonSlice;
export const lessonPhrasesActions = { fetchLessonPhrases, ...actions };
export default reducer;
