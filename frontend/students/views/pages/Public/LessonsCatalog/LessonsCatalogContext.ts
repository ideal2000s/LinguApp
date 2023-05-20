import React from 'react';
import { ICoursesCatalog, ILessonsCatalog, tCatalogItems } from 'students/models';
import { EventDispatcher } from 'students/views/shared/bundles/events';

const LessonsCatalogContext = React.createContext<{
  lessonsCatalog: ILessonsCatalog | null;
  coursesCatalog: ICoursesCatalog | null;
  catalogItems: tCatalogItems;
  dispatchFilterEvent: EventDispatcher['dispatchEvent'] | null;
  addFilterListener: EventDispatcher['addListener'] | null;
  catalogIsLoading: boolean;
  fetchCatalog: () => void;
  fetchCatalogMore: () => void;
  resetAllFilters: () => void;
}>({
  lessonsCatalog: null,
  coursesCatalog: null,
  catalogItems: [],
  dispatchFilterEvent: null,
  addFilterListener: null,
  catalogIsLoading: false,
  fetchCatalog: () => console.log('fetchCatalog handler should be defined'),
  fetchCatalogMore: () => console.log('fetchCatalogMore handler should be defined'),
  resetAllFilters: () => console.log('resetAllFilters handler should be defined')
});

export default LessonsCatalogContext;
