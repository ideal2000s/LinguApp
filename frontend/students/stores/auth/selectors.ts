import { createSelector, Selector } from '@reduxjs/toolkit';
import { tAppState } from '../rootStore';

const selectAuthStore: Selector<tAppState, tAppState['auth']> = (state) => state.auth;
const selectModal: Selector<tAppState, tAppState['auth']['modal']> = createSelector(
  [selectAuthStore],
  (authStore) => authStore.modal
);

const selectTempUser: Selector<tAppState, tAppState['auth']['tempUser']> = createSelector(
  [selectAuthStore],
  (authStore) => authStore.tempUser
);

const authSelectors = {
  selectAuthStore,
  selectModal,
  selectTempUser
};

export default authSelectors;
