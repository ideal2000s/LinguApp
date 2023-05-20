import { createSelector, Selector } from '@reduxjs/toolkit';
import {
  ICourseDetails,
  ICourseDetailsReview,
  ILessonsCatalog,
  ICoursesCatalog,
  tSkills,
  tCatalogItems
} from 'students/models';

import { tAppState } from '../rootStore';

const selectPublicStore: Selector<tAppState, tAppState['public']> = (state) =>
  state.public;

const selectCoursePage: Selector<
  tAppState,
  tAppState['public']['coursePage']
> = createSelector([selectPublicStore], (courseStore) => courseStore.coursePage);

const selectLessonsCatalogPage: Selector<
  tAppState,
  tAppState['public']['lessonsCatalogPage']
> = createSelector([selectPublicStore], (courseStore) => courseStore.lessonsCatalogPage);

const selectCourse: Selector<tAppState, ICourseDetails | null> = createSelector(
  [selectCoursePage],
  (coursePageStore) => coursePageStore.course
);

const selectCourseReviews: Selector<
  tAppState,
  ICourseDetailsReview[] | null
> = createSelector([selectCoursePage], (coursePageStore) => coursePageStore.reviews);

const selectLessonsCatalog: Selector<tAppState, ILessonsCatalog | null> = createSelector(
  [selectLessonsCatalogPage],
  (lessonsCatalogStore) => lessonsCatalogStore.lessonsCatalog
);

const selectCoursesCatalog: Selector<tAppState, ICoursesCatalog | null> = createSelector(
  [selectLessonsCatalogPage],
  (lessonsCatalogStore) => lessonsCatalogStore.coursesCatalog
);

const selectCatalogItems: Selector<tAppState, tCatalogItems> = createSelector(
  [selectLessonsCatalogPage],
  (lessonsCatalogStore) => lessonsCatalogStore.catalogItems
);

const selectCatalog: Selector<
  tAppState,
  {
    lessonCatalog: ILessonsCatalog | null;
    courseCatalog: ICoursesCatalog | null;
    catalogItems: tCatalogItems;
  }
> = createSelector(
  [selectLessonsCatalog, selectCoursesCatalog, selectCatalogItems],
  (lessonCatalog, courseCatalog, catalogItems) => ({
    lessonCatalog,
    courseCatalog,
    catalogItems
  })
);

const selectSkills: Selector<tAppState, tSkills | null> = createSelector(
  [selectLessonsCatalogPage],
  (lessonsCatalogStore) => lessonsCatalogStore.skills
);

const courseSelectors = {
  selectPublicStore,
  selectCourse,
  selectCourseReviews,
  selectLessonsCatalog,
  selectCoursesCatalog,
  selectCatalog,
  selectSkills
};

export default courseSelectors;
