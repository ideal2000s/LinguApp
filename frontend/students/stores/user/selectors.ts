import { createSelector, Selector } from '@reduxjs/toolkit';
import sortBy from 'lodash/sortBy';
import { tAppState } from '../rootStore';
import { tOnboardingStep, IProfile } from 'students/models';
import { ILanguage } from './preferences';

const selectUser: Selector<tAppState, tAppState['user']> = (state) => state.user;

const selectProfile: Selector<tAppState, tAppState['user']['profile']> = (state) =>
  state.user.profile;

const selectPreferences: Selector<tAppState, tAppState['user']['preferences']> = (
  state
) => state.user.preferences;

const selectProfileIsValid: Selector<
  tAppState,
  IProfile['valid'] | undefined
> = createSelector([selectProfile], (profile) => profile?.valid);

const selectOnboarding: Selector<tAppState, tOnboardingStep[]> = createSelector(
  [selectProfile],
  (profile) => {
    if (!profile) return [];

    const onboarding: tOnboardingStep[] = [];
    const { activeStudentTargetLanguageId, nativeLanguageId } = profile;

    if (!activeStudentTargetLanguageId) {
      onboarding.push('TARGET_LANGUAGE');
    }

    if (!nativeLanguageId) {
      onboarding.push('NATIVE_LANGUAGE');
    }

    return onboarding;
  }
);

const selectTargetLangs: Selector<tAppState, ILanguage[]> = createSelector(
  [selectPreferences],
  (preferences) => preferences.targetLangs
);

const selectLesson: Selector<tAppState, tAppState['lesson']> = (state) => state.lesson;

const selectSortedTargetLangs: Selector<tAppState, ILanguage[]> = createSelector(
  [selectLesson, selectTargetLangs],
  (lesson, targetLangs) =>
    sortBy(targetLangs, (lang) => (lang.code === lesson.data?.languageCode ? -1 : +1))
);

const selectAllLangs: Selector<tAppState, ILanguage[]> = createSelector(
  [selectPreferences],
  (preferences) => preferences.allLangs
);

const selectSortedAllLangs: Selector<tAppState, ILanguage[]> = createSelector(
  [selectProfile, selectAllLangs],
  (profile, allLangs) =>
    sortBy(allLangs, (lang) => (lang.code === profile?.locale ? -1 : +1))
);

const selectProfileLocale: Selector<tAppState, IProfile['locale']> = createSelector(
  [selectProfile],
  (profile) => {
    if (profile) {
      return profile.locale;
    }

    return null;
  }
);

const userSelectors = {
  selectUser,
  selectProfile,
  selectProfileIsValid,
  selectOnboarding,
  selectTargetLangs,
  selectSortedTargetLangs,
  selectSortedAllLangs,
  selectAllLangs,
  selectProfileLocale
};

export default userSelectors;
