import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IPreferences } from './';
import PreferencesApi from './api';
import { tApiService } from 'students/utils/apiService';

const initialPreferencesState: IPreferences = {
  allLangs: [],
  targetLangs: []
};
const getSupportedLanguages = createAsyncThunk<
  IPreferences['allLangs'],
  void,
  { extra: { apiService: tApiService }; rejectValue: string }
>(
  'preferences/getSupportedLanguages_request',
  async (_, { extra: { apiService }, rejectWithValue }) => {
    const api = new PreferencesApi(apiService);
    try {
      const data = await api.getAllSupportedLanguages();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getTargetLanguages = createAsyncThunk<
  IPreferences['allLangs'],
  void,
  { extra: { apiService: tApiService }; rejectValue: string }
>(
  'preferences/getTargetLanguages_request',
  async (_, { extra: { apiService }, rejectWithValue }) => {
    const api = new PreferencesApi(apiService);
    try {
      const data = await api.getAllTargetLanguages();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: 'preferences',
  initialState: initialPreferencesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTargetLanguages.fulfilled, (state, action) => {
      state.targetLangs = action.payload;
    });
    builder.addCase(getSupportedLanguages.fulfilled, (state, action) => {
      state.allLangs = action.payload;
    });
  }
});

const { reducer } = profileSlice;
export default reducer;

const preferencesActions = { getSupportedLanguages, getTargetLanguages };
export { preferencesActions };
