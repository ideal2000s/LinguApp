import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import apiServiceCreator from 'students/utils/apiService';
import { showLessonLicenseModal } from './lesson';

import rootReducer from './rootReducer';
import { profileActions } from './user';

export const history = createBrowserHistory();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          apiService: apiServiceCreator({
            authFailureAction: ({ status }) => {
              if (status === 401) {
                store.dispatch(profileActions.removeProfile());
              } else if (status === 403) {
                store.dispatch(showLessonLicenseModal());
              }
            }
          })
        }
      }
    }).concat(routerMiddleware(history))
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    // eslint-disable-next-line
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type tAppState = ReturnType<typeof store.getState>;
export type tAppDispatch = typeof store.dispatch;

export default store;
