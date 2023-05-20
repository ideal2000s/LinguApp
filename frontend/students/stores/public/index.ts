import { combineReducers } from '@reduxjs/toolkit';

import publicPageSelectors from './selectors';
import coursePageReducer, { coursePageActions } from './course';
import lessonsCatalogReducer, { lessonsCatalogActions } from './lessonsCatalog';

const publicPageReducer = combineReducers({
  coursePage: coursePageReducer,
  lessonsCatalogPage: lessonsCatalogReducer
});

export default publicPageReducer;

export { publicPageSelectors, coursePageActions, lessonsCatalogActions };
