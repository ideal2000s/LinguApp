import { Reducer, ReducersMapObject } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter, RouterState } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import lessonReducer from './lesson';
import lessonTaskReducer from './lessonTask';
import authReducer from './auth';
import userReducer from './user';
import modalReducer from './modal';
import requestingReducer from './requesting';
import publicReducer from './public';
import documentReducer from './document';

const history = createBrowserHistory();

interface State {
  lesson: ReturnType<typeof lessonReducer>;
  lessonTask: ReturnType<typeof lessonTaskReducer>;
  auth: ReturnType<typeof authReducer>;
  user: ReturnType<typeof userReducer>;
  modal: ReturnType<typeof modalReducer>;
  requesting: ReturnType<typeof requestingReducer>;
  router: RouterState;
  public: ReturnType<typeof publicReducer>;
  document: ReturnType<typeof documentReducer>;
}

const reducerMap: ReducersMapObject<State> = {
  lesson: lessonReducer,
  lessonTask: lessonTaskReducer,
  auth: authReducer,
  user: userReducer,
  modal: modalReducer,
  requesting: requestingReducer,
  router: connectRouter(history) as Reducer<RouterState>,
  public: publicReducer,
  document: documentReducer
};

const rootReducer = combineReducers(reducerMap);

export default rootReducer;
