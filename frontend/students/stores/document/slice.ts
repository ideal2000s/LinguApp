import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IAssignmentTask,
  IDocument,
  IDocumentApiRequest,
  IDocumentApiResponse
} from 'students/models';
import { tApiService } from 'students/utils/apiService';

import DocumentApi from './api';

type tDocumentState = IDocument | null;
const initialState: tDocumentState = null;

const fetchDocument = createAsyncThunk<
  IDocumentApiResponse['document'],
  {
    task: IAssignmentTask;
  },
  { extra: { apiService: tApiService } }
>('lessonTask/fetchDocument_request', async ({ task }, { extra: { apiService } }) => {
  const api = new DocumentApi(apiService);

  try {
    const { document } = await api.fetchDocument(task.lessonId, task.id);

    return document;
  } catch (_) {
    return null;
  }
});

const createDocument = createAsyncThunk<
  IDocumentApiResponse['document'],
  {
    task: IAssignmentTask;
    data: IDocumentApiRequest | FormData;
  },
  { extra: { apiService: tApiService } }
>(
  'lessonTask/createDocument_request',
  async ({ task, data }, { extra: { apiService } }) => {
    const api = new DocumentApi(apiService);

    const { document } = await api.createDocument(task.lessonId, task.id, data);

    return document;
  }
);

const documentSlice = createSlice({
  name: 'document',

  initialState: initialState as tDocumentState,

  reducers: {
    drop: () => initialState
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDocument.fulfilled, (_, action) => action.payload);

    builder.addCase(createDocument.fulfilled, (_, action) => action.payload);
  }
});

const { reducer, actions } = documentSlice;

export const documentActions = { ...actions, fetchDocument, createDocument };

export default reducer;
