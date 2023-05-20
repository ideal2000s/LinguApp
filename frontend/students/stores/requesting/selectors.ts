import { createSelector, Selector } from '@reduxjs/toolkit';
import { profileActions } from 'students/stores/user/profile';

import IRequestingState from './model';
import { tAppState } from '../rootStore';

const selectRequesting: Selector<tAppState, tAppState['requesting']> = (state) =>
  state.requesting;

const selectProfileRequesting: Selector<tAppState, boolean> = createSelector(
  [selectRequesting],
  (requesting) => !!requesting[profileActions.getProfile.typePrefix]
);

const selectHasRequestingActions = (
  actionsToRequest: string[]
): Selector<tAppState, boolean> =>
  createSelector([selectRequesting], (requesting: IRequestingState) => {
    const selectedActions = actionsToRequest.reduce((acc: boolean[], action: string) => {
      if (requesting && requesting[action]) {
        acc.push(requesting[action]);
      }

      return acc;
    }, []);

    return selectedActions.reduce((acc, curr) => curr, false);
  });

export default { selectRequesting, selectProfileRequesting, selectHasRequestingActions };
