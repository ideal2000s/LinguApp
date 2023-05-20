import { authActions } from '../auth';
import { tAppDispatch } from '../rootStore';
import { listenFederatedAuthMessage } from './authToken';

export function init(): (dispatch: tAppDispatch) => void {
  return (dispatch: tAppDispatch) => {
    dispatch(authActions.checkAuth());
    listenFederatedAuthMessage(() => {
      dispatch(authActions.checkAuth());
    });
  };
}
