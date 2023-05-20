import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ICourseDetails, ICourseDetailsReview } from 'students/models';
import { tApiService } from 'students/utils/apiService';

import CourseApi from './api';

interface ICoursePageState {
  course: ICourseDetails | null;
  reviews: ICourseDetailsReview[] | null;
}

const initialState: ICoursePageState = {
  course: null,
  reviews: null
};

const getCourse = createAsyncThunk<
  ICourseDetails,
  ICourseDetails['slug'],
  { extra: { apiService: tApiService } }
>('public/getCourse_request', async (slug, { extra: { apiService } }) => {
  const api = new CourseApi(apiService);
  const { course } = await api.fetchCourse(slug);

  return course;
});

const getCourseReviews = createAsyncThunk<
  ICourseDetailsReview[],
  ICourseDetails['slug'],
  { extra: { apiService: tApiService } }
>('public/getCourse_request', async (slug, { extra: { apiService } }) => {
  const api = new CourseApi(apiService);
  const { reviews } = await api.fetchCourseReviews(slug);

  return reviews;
});

const coursePageSlice = createSlice({
  name: 'coursePage',
  initialState: initialState as ICoursePageState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourse.pending, () => initialState);

    builder.addCase(getCourse.fulfilled, (state, action) => ({
      ...state,
      course: action.payload
    }));
  }
});

const { reducer: coursePageReducer } = coursePageSlice;

const coursePageActions = {
  getCourse,
  getCourseReviews
};

export { coursePageActions };

export default coursePageReducer;
