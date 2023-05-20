import { createSelector, Selector } from '@reduxjs/toolkit';
import { tAppState } from '../rootStore';
import { ILessonTaskBase, ITaskSession } from 'students/models';

const selectLessonTaskStore: Selector<tAppState, tAppState['lessonTask']> = (state) =>
  state.lessonTask;
const selectLessonTask: Selector<
  tAppState,
  tAppState['lessonTask']['data']
> = createSelector([selectLessonTaskStore], (lessonTaskStore) => lessonTaskStore.data);

const selectLessonTaskItems: Selector<
  tAppState,
  ILessonTaskBase['items'] | undefined
> = createSelector([selectLessonTask], (lessonTask) => lessonTask?.items);

const selectLessonTaskSession: Selector<
  tAppState,
  tAppState['lessonTask']['session']
> = createSelector([selectLessonTaskStore], (lessonTaskStore) => lessonTaskStore.session);

function sortItemSessions(
  itemSessions: ITaskSession['taskItemSessions'],
  lessonTaskItems: ILessonTaskBase['items']
): ITaskSession['taskItemSessions'] {
  const newTaskItemSessions: typeof itemSessions = [];

  lessonTaskItems.forEach((item) => {
    const itemSession = itemSessions.find((session) => session.taskItemId === item.id);
    if (itemSession) {
      newTaskItemSessions.push(itemSession);
    }
  });

  return newTaskItemSessions;
}

const selectSortedLessonTaskSession: Selector<
  tAppState,
  ITaskSession | null
> = createSelector(
  [selectLessonTaskItems, selectLessonTaskSession],
  (lessonTaskItems, lessonTaskSession) => {
    if (
      !lessonTaskSession ||
      !lessonTaskItems ||
      lessonTaskSession.taskItemSessions.length !== lessonTaskItems.length
    ) {
      return lessonTaskSession;
    }

    const newTaskItemSessions = sortItemSessions(
      lessonTaskSession.taskItemSessions,
      lessonTaskItems
    );

    newTaskItemSessions.sort();
    return {
      ...lessonTaskSession,
      taskItemSessions: newTaskItemSessions
    };
  }
);

const lessonTaskSelectors = {
  selectLessonTaskStore,
  selectLessonTask,
  selectLessonTaskSession,
  selectSortedLessonTaskSession
};

export default lessonTaskSelectors;
