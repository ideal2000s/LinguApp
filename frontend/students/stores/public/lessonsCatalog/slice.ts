import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  ILessonsCatalog,
  ICoursesCatalog,
  tSkills,
  tCatalogItems,
  tCatalogItemType,
  tWithCatalogItemType
} from 'students/models';
import { tApiService } from 'students/utils/apiService';

import LessonsCatalogApi from './api';
import { tAppState } from '../../rootStore';

interface ILessonsCatalogState {
  catalogItems: tCatalogItems;
  lessonsCatalog: ILessonsCatalog | null;
  coursesCatalog: ICoursesCatalog | null;
  skills: tSkills;
}

const initialState: ILessonsCatalogState = {
  catalogItems: [],
  lessonsCatalog: null,
  coursesCatalog: null,
  skills: []
};

function mixArrayIntoArray<T1, T2>(array1?: T1[], array2?: T2[]): Array<T1 | T2> {
  const STEP = 4;
  const _array1 = [...(array1 || [])];
  const _array2 = [...(array2 || [])];
  const allItemsLength = _array1.length + _array2.length;

  const result: Array<T1 | T2> = [];
  for (let i = 0; i < allItemsLength; i++) {
    const item1 = _array1[0];
    const item2 = _array2[0];

    if (item2 && i > 0 && i % STEP === 0) {
      result.push(item2);
      _array2.shift();
    } else if (item1) {
      result.push(item1);
      _array1.shift();
    } else if (item2) {
      result.push(item2);
      _array2.shift();
    }
  }
  return result;
}

function markCatalogItemsWithType<T>(
  array: T[] | undefined,
  type: tCatalogItemType
): tWithCatalogItemType<T>[] | undefined {
  if (!array) return;
  return array.map((item) => ({
    ...item,
    type
  }));
}

const getCatalogItems = createAsyncThunk<
  {
    catalogItems: tCatalogItems;
    lessonsCatalog: ILessonsCatalog | null;
    coursesCatalog: ICoursesCatalog | null;
  },
  string,
  { extra: { apiService: tApiService } }
>(
  'public/getCoursesCatalogItems_request',
  async (filterUrlString, { extra: { apiService } }) => {
    const api = new LessonsCatalogApi(apiService);
    const [{ coursesCatalog }, { lessonsCatalog }] = await Promise.all([
      api.fetchCoursesCatalog(filterUrlString).catch(() => ({ coursesCatalog: null })),
      api.fetchLessonsCatalog(filterUrlString).catch(() => ({ lessonsCatalog: null }))
    ]);

    return {
      lessonsCatalog,
      coursesCatalog,
      catalogItems: mixArrayIntoArray(
        markCatalogItemsWithType(lessonsCatalog?.lessons, 'lesson'),
        markCatalogItemsWithType(coursesCatalog?.courses, 'course')
      )
    };
  }
);

const getCatalogMore = createAsyncThunk<
  {
    catalogItems: tCatalogItems;
    lessonsCatalog: ILessonsCatalog | null;
    coursesCatalog: ICoursesCatalog | null;
  } | null,
  string,
  { extra: { apiService: tApiService }; state: tAppState }
>(
  'public/getCatalogMore_request',
  async (filterUrlString, { extra: { apiService }, getState }) => {
    const api = new LessonsCatalogApi(apiService);
    const coursesPageNumber = getState().public.lessonsCatalogPage.coursesCatalog
      ?.nextPage;
    const lessonsPageNumber = getState().public.lessonsCatalogPage.lessonsCatalog
      ?.nextPage;
    const pageNumber = coursesPageNumber || lessonsPageNumber;

    if (!pageNumber) return null;

    const [{ coursesCatalog }, { lessonsCatalog }] = await Promise.all([
      api
        .fetchCoursesCatalog(filterUrlString, pageNumber)
        .catch(() => ({ coursesCatalog: null })),
      api
        .fetchLessonsCatalog(filterUrlString, pageNumber)
        .catch(() => ({ lessonsCatalog: null }))
    ]);

    return {
      lessonsCatalog,
      coursesCatalog,
      catalogItems: mixArrayIntoArray(
        markCatalogItemsWithType(lessonsCatalog?.lessons, 'lesson'),
        markCatalogItemsWithType(coursesCatalog?.courses, 'course')
      )
    };
  }
);

const getSkills = createAsyncThunk<tSkills, void, { extra: { apiService: tApiService } }>(
  'public/getSkills_request',
  async (_, { extra: { apiService } }) => {
    const api = new LessonsCatalogApi(apiService);
    const { skills } = await api.fetchSkills();

    return skills;
  }
);

const lessonCatalogSlice = createSlice({
  name: 'lessonsCatalog',
  initialState: initialState as ILessonsCatalogState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatalogItems.fulfilled, (state, action) => {
      const { coursesCatalog, lessonsCatalog, catalogItems } = action.payload;
      state.coursesCatalog = coursesCatalog;
      state.lessonsCatalog = lessonsCatalog;
      state.catalogItems = catalogItems;
    });

    builder.addCase(getCatalogMore.fulfilled, (state, action) => {
      const { payload } = action;
      if (payload) {
        state.coursesCatalog = payload.coursesCatalog;
        state.lessonsCatalog = payload.lessonsCatalog;
        state.catalogItems.splice(state.catalogItems.length, 0, ...payload.catalogItems);
      }
    });

    builder.addCase(getSkills.fulfilled, (state, action) => ({
      ...state,
      skills: action.payload
    }));
  }
});

const { reducer: lessonsCatalogReducer } = lessonCatalogSlice;

const lessonsCatalogActions = {
  getCatalogItems,
  getCatalogMore,
  getSkills
};

export { lessonsCatalogActions };

export default lessonsCatalogReducer;
