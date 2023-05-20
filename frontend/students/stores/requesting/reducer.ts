/*
 * Note: This reducer breaks convention on how reducers should be setup.
 */
import LinguAction from 'students/types/LinguAction';

import IRequestingState from './model';

export const initialState: IRequestingState = {};

export default function requestingReducer(
  state: IRequestingState = initialState,
  action: LinguAction<any>
): IRequestingState {
  // We only take actions that include '_request' in the type.
  const isRequestType: boolean = action.type.includes('_request');

  if (!isRequestType) {
    return state;
  }

  const requestName: string = action.type
    .replace('/pending', '')
    .replace('/fulfilled', '')
    .replace('/rejected', '');

  // If we've got pending request, add it to our store
  if (action.type.includes('pending')) {
    return {
      ...state,
      [requestName]: true
    };
  }

  // Otherwise - remove it from our store
  const newState = { ...state };

  delete newState[requestName];

  return newState;
}
