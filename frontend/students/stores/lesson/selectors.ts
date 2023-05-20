import { createSelector, Selector } from '@reduxjs/toolkit';
import { tAppState } from '../rootStore';

const selectLessonStore: Selector<tAppState, tAppState['lesson']> = (state) =>
  state.lesson;
const selectLesson: Selector<tAppState, tAppState['lesson']['data']> = createSelector(
  [selectLessonStore],
  (lessonStore) => lessonStore.data
);

const selectLessonSession: Selector<
  tAppState,
  tAppState['lesson']['session']
> = createSelector([selectLessonStore], (lessonStore) => lessonStore.session);

const selectLessonPhrases: Selector<
  tAppState,
  tAppState['lesson']['phrases']
> = createSelector([selectLessonStore], (lessonStore) => lessonStore.phrases);

const selectSessionResults: Selector<
  tAppState,
  tAppState['lesson']['sessionResults']
> = createSelector([selectLessonStore], (lessonStore) => lessonStore.sessionResults);

const selectLessonGameplays: Selector<
  tAppState,
  tAppState['lesson']['gameplays']
> = createSelector([selectLessonStore], (lessonStore) => lessonStore.gameplays);

const lessonSelectors = {
  selectLessonStore,
  selectLesson,
  selectLessonSession,
  selectLessonPhrases,
  selectSessionResults,
  selectLessonGameplays
};

export default lessonSelectors;
